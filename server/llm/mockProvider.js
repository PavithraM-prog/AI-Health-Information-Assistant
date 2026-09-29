/**
 * Extractive Mock LLM Provider
 * Fallback generator that synthesizes coherent, structured answers
 * directly from retrieved knowledge passages without requiring an external API key.
 * Guarantees that the academic demo is 100% functional out-of-the-box.
 */

export async function generateWithMock({ query, contextPassages, systemPrompt, boundaryGuidance }) {
  if (!contextPassages || contextPassages.length === 0) {
    return {
      text: "I could not find sufficiently relevant information in our curated health knowledge base to answer your question. To ensure safety and prevent medical hallucinations, I only provide information verified by clinical authorities. Please consult a qualified medical professional for personalized advice.",
      model: "Mock-Extractive-Synthesizer-v1",
      provider: "mock"
    };
  }

  const primaryDoc = contextPassages[0].document;
  const secondaryDocs = contextPassages.slice(1).map(cp => cp.document);

  // Extract key sentences matching query keywords
  const queryTerms = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 2);
  const paragraphs = primaryDoc.content.split('\n\n').filter(p => p.trim().length > 0);

  let synthesizedAnswer = '';

  // Add boundary note if diagnostic question was asked
  if (boundaryGuidance) {
    synthesizedAnswer += `> **Important Notice:** As an educational health assistant, I cannot provide personal medical diagnoses or prescribe medications. The following information explains general evidence-based concepts regarding this topic.\n\n`;
  }

  synthesizedAnswer += `### Summary: ${primaryDoc.title}\n\n`;

  // Lead paragraph from primary source
  if (paragraphs.length > 0) {
    synthesizedAnswer += `${paragraphs[0]}\n\n`;
  }

  // Key evidence points
  synthesizedAnswer += `#### Key Evidence-Based Guidance:\n`;
  
  if (paragraphs.length > 1) {
    // Break into readable bullet points
    const lines = paragraphs[1].split('\n').filter(l => l.trim().length > 0);
    for (const line of lines) {
      if (line.startsWith('-') || /^\d+\./.test(line)) {
        synthesizedAnswer += `${line}\n`;
      } else {
        synthesizedAnswer += `- ${line}\n`;
      }
    }
  } else {
    // Generate bullet points from content
    const sentences = primaryDoc.content.split('. ').filter(s => s.trim().length > 10).slice(1, 5);
    for (const sent of sentences) {
      synthesizedAnswer += `- ${sent.trim()}${sent.trim().endsWith('.') ? '' : '.'}\n`;
    }
  }

  // Include safety / warning section if available in text
  const warningPara = paragraphs.find(p => /seek immediate|when to seek|red flags|warning signs|emergency/i.test(p));
  if (warningPara) {
    synthesizedAnswer += `\n#### When to Seek Medical Evaluation:\n${warningPara}\n`;
  }

  // Add mention of supporting topics if any
  if (secondaryDocs.length > 0) {
    synthesizedAnswer += `\n*Related verified topics: ${secondaryDocs.map(d => d.title).join(', ')}.*`;
  }

  return {
    text: synthesizedAnswer,
    model: "Mock-Extractive-RAG-Engine",
    provider: "mock",
    metadata: {
      tokensUsed: Math.round(synthesizedAnswer.length / 4),
      passagesSynthesized: contextPassages.length
    }
  };
}
