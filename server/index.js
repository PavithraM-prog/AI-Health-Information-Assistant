import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadKnowledgeBase, getAllDocuments, getDocumentById, searchKnowledge } from './knowledgeBase.js';
import { checkInputSafety, validateOutputSafety } from './safety/safetyLayer.js';
import { generateHealthResponse } from './llm/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize knowledge base
loadKnowledgeBase();

// Standard System Prompt for the Health Information Assistant
const BASE_SYSTEM_PROMPT = 
  "You are a health information assistant. Use ONLY the provided context. " +
  "Explain in simple language. Do not diagnose or prescribe treatment. " +
  "If the context does not contain the answer, say so. " +
  "Encourage consulting a qualified healthcare professional when appropriate. " +
  "Every response must conclude with: 'This is general information, not medical advice.'";

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    knowledgeDocsLoaded: getAllDocuments().length,
    activeProvider: process.env.LLM_PROVIDER || (process.env.LLM_API_KEY ? 'auto-configured' : 'extractive-mock')
  });
});

/**
 * Retrieve all available knowledge topics for discovery
 */
app.get('/api/topics', (req, res) => {
  const docs = getAllDocuments().map(doc => ({
    id: doc.id,
    title: doc.title,
    category: doc.category || 'General Health',
    source_name: doc.source_name,
    source_url: doc.source_url,
    last_reviewed: doc.last_reviewed,
    keywords: doc.keywords || []
  }));
  res.json({ topics: docs });
});

/**
 * Get detailed knowledge document by ID
 */
app.get('/api/knowledge/:id', (req, res) => {
  const doc = getDocumentById(req.params.id);
  if (!doc) {
    return res.status(404).json({ error: 'Topic not found in verified knowledge base.' });
  }
  res.json(doc);
});

/**
 * Core RAG Pipeline Endpoint: POST /api/chat
 */
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'User query message is required.' });
  }

  const query = message.trim();

  // PIPELINE STEP 1: User Query Ingestion
  const pipelineLog = {
    query,
    receivedAt: new Date().toISOString()
  };

  // PIPELINE STEP 2: Safety Layer Pre-Generation Checks
  const preSafety = checkInputSafety(query);
  pipelineLog.preSafetyCheck = preSafety;

  // Emergency Red Flag Fast-Path
  if (preSafety.skipGeneration) {
    const finalResponse = validateOutputSafety(preSafety.response).text;
    pipelineLog.postSafetyValidation = {
      passed: true,
      modificationsMade: false,
      emergencyBypass: true
    };
    pipelineLog.generation = {
      provider: 'emergency-safety-triage',
      model: 'Rule-Based-Clinical-Triage-Filter',
      bypassedLLM: true
    };
    pipelineLog.timingMs = Date.now() - startTime;

    return res.json({
      response: finalResponse,
      isEmergency: true,
      sources: [],
      pipelineInspector: pipelineLog
    });
  }

  // PIPELINE STEP 3: Information Retrieval (BM25 Keyword Search)
  const retrievalResult = searchKnowledge(query, 3);
  pipelineLog.retrieval = {
    queryTokens: retrievalResult.queryTokens,
    maxScore: retrievalResult.maxScore,
    isRelevant: retrievalResult.isRelevant,
    topMatches: retrievalResult.results.map(r => ({
      id: r.document.id,
      title: r.document.title,
      score: r.score,
      matchedTokens: r.matchedTokens,
      source_name: r.document.source_name,
      source_url: r.document.source_url
    }))
  };

  // Low Relevance Gate: If no relevant passages found in knowledge base
  if (!retrievalResult.isRelevant || retrievalResult.results.length === 0) {
    const notFoundMessage = 
      "I could not find sufficiently relevant information in our curated health knowledge base to answer your question responsibly.\n\n" +
      "To ensure high safety standards and prevent medical hallucinations, I only generate answers grounded in verified clinical documents. " +
      "Please consult a qualified medical professional, or explore one of our supported topics such as hydration, cold vs. flu, sleep hygiene, nutrition, or fever care.\n\n" +
      "---\n*This is general information, not medical advice.*";

    pipelineLog.promptEngineering = {
      notice: 'Skipped generation due to low BM25 relevance threshold.'
    };
    pipelineLog.generation = {
      provider: 'threshold-guardrail',
      model: 'Relevance-Gatekeeper'
    };
    pipelineLog.postSafetyValidation = {
      passed: true,
      modificationsMade: false
    };
    pipelineLog.timingMs = Date.now() - startTime;

    return res.json({
      response: notFoundMessage,
      isLowRelevance: true,
      sources: [],
      pipelineInspector: pipelineLog
    });
  }

  // PIPELINE STEP 4: Prompt Engineering Construction (Role, Context, Task, Safety)
  const topPassages = retrievalResult.results;
  
  const roleBlock = "Role: You are a trustworthy health information assistant. Use ONLY the verified context passages provided below to answer the user inquiry. Explain clearly and accurately in simple, patient-friendly language.";
  
  const contextBlock = "Context:\n" + topPassages.map((p, idx) => {
    return `[Passage ${idx + 1}] ID: ${p.document.id} | Title: ${p.document.title}\nSource: ${p.document.source_name}\nContent: ${p.document.content}`;
  }).join('\n\n');

  const taskBlock = `Task: Explain the health information relevant to the user query: "${query}". Provide practical, clear explanations and summarize key points.`;

  let safetyBlock = "Safety Guidelines:\n- Do NOT provide personalized medical diagnoses, prescribe treatments, or recommend specific pharmaceutical dosages.\n- If the context does not contain the answer, say so explicitly.\n- Encourage consulting a qualified healthcare professional when appropriate.";

  if (preSafety.requiresBoundaryGuidance) {
    safetyBlock += "\n- CRITICAL POLICY: The user may be seeking a direct diagnosis or prescription. Clarify politely that you can only explain general concepts and recommend seeing a healthcare provider.";
  }

  const constructedPrompt = `${roleBlock}\n\n${contextBlock}\n\n${taskBlock}\n\n${safetyBlock}\n\nUser Question: ${query}\nAssistant Response:`;

  pipelineLog.promptEngineering = {
    role: roleBlock,
    contextSummary: `${topPassages.length} passages (${topPassages.map(p => p.document.title).join('; ')})`,
    context: contextBlock,
    task: taskBlock,
    safety: safetyBlock,
    constructedPrompt: constructedPrompt
  };

  // PIPELINE STEP 5: Generative AI Execution
  let rawGenResult;
  try {
    rawGenResult = await generateHealthResponse({
      query,
      contextPassages: topPassages,
      systemPrompt: BASE_SYSTEM_PROMPT,
      constructedPrompt,
      boundaryGuidance: preSafety.requiresBoundaryGuidance
    });
  } catch (error) {
    console.error('Generation failure:', error);
    rawGenResult = {
      text: "We encountered an issue during response generation. Please refer to our verified knowledge base topics or consult a qualified physician.",
      model: "System-Error-Fallback",
      provider: "fallback"
    };
  }

  pipelineLog.generation = {
    provider: rawGenResult.provider,
    model: rawGenResult.model,
    rawTextPreview: rawGenResult.text.substring(0, 160) + '...',
    metadata: rawGenResult.metadata || {}
  };

  // PIPELINE STEP 6: Post-Generation Output Validation
  const validatedOutput = validateOutputSafety(rawGenResult.text);
  pipelineLog.postSafetyValidation = {
    passed: validatedOutput.passed,
    issuesFound: validatedOutput.issuesFound,
    auditDetails: validatedOutput.auditDetails
  };

  pipelineLog.timingMs = Date.now() - startTime;

  // Prepare source citation chips
  const sources = topPassages.map(p => ({
    id: p.document.id,
    title: p.document.title,
    category: p.document.category,
    source_name: p.document.source_name,
    source_url: p.document.source_url,
    last_reviewed: p.document.last_reviewed,
    relevanceScore: p.score
  }));

  return res.json({
    response: validatedOutput.text,
    sources,
    pipelineInspector: pipelineLog
  });
});

// Serve frontend in production if built
const clientDistPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send('AI Health Information Assistant API is active. Run Vite dev server for frontend UI.');
    }
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`AI Health Information Assistant backend running on http://localhost:${PORT}`);
  });
}

export default app;
