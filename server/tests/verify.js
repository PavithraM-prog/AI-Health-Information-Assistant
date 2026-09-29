/**
 * Automated Verification Script for AI Health Information Assistant
 * Tests RAG pipeline, BM25 retrieval, emergency safety guards,
 * diagnostic gating, and extractive mock generator.
 */

import { loadKnowledgeBase, searchKnowledge, getAllDocuments } from '../knowledgeBase.js';
import { checkInputSafety, validateOutputSafety } from '../safety/safetyLayer.js';
import { generateWithMock } from '../llm/mockProvider.js';

console.log('====================================================');
console.log('Starting Verification Suite: AI Health RAG Assistant');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failCount++;
  }
}

async function runTests() {
  // Test 1: Load Knowledge Base
  const docs = loadKnowledgeBase();
  assert(docs.length >= 15, `Knowledge base loaded ${docs.length} topics (Expected >= 15)`);

  // Test 2: BM25 Retrieval on 'dehydration'
  const dehySearch = searchKnowledge('What are the symptoms and signs of dehydration?', 3);
  assert(dehySearch.isRelevant, 'BM25 returned relevant result for dehydration query');
  assert(dehySearch.results.length > 0 && dehySearch.results[0].document.id === 'dehydration', 
    `Top result is dehydration (Got: ${dehySearch.results[0]?.document?.id})`);

  // Test 3: BM25 Retrieval on 'cold vs flu'
  const coldFluSearch = searchKnowledge('How do I tell the difference between a cold and the flu?', 3);
  assert(coldFluSearch.isRelevant && coldFluSearch.results[0].document.id === 'cold-vs-flu',
    `Top result is cold-vs-flu (Got: ${coldFluSearch.results[0]?.document?.id})`);

  // Test 4: BM25 Low Relevance on Unrelated Query
  const unrelatedSearch = searchKnowledge('What is the stock price of IBM or Microsoft today?', 3);
  assert(unrelatedSearch.maxScore < 0.5 || !unrelatedSearch.isRelevant,
    `Unrelated query correctly triggered low relevance (Score: ${unrelatedSearch.maxScore})`);

  // Test 5: Safety Check - Emergency Red Flag (Chest Pain)
  const chestPainCheck = checkInputSafety('I have severe chest pain radiating to my left arm, what should I do?');
  assert(chestPainCheck.skipGeneration === true && chestPainCheck.status === 'EMERGENCY_TRIGGERED',
    `Emergency red flag correctly bypassed generation for chest pain (${chestPainCheck.category})`);

  // Test 6: Safety Check - Emergency Red Flag (Difficulty Breathing)
  const breathingCheck = checkInputSafety('My throat is closing up and I can barely breathe');
  assert(breathingCheck.skipGeneration === true && breathingCheck.status === 'EMERGENCY_TRIGGERED',
    `Emergency red flag correctly identified respiratory distress (${breathingCheck.category})`);

  // Test 7: Safety Check - Diagnostic Gating
  const diagnosticCheck = checkInputSafety('Can you diagnose me and tell me what illness I have?');
  assert(diagnosticCheck.requiresBoundaryGuidance === true,
    'Diagnostic request correctly triggered boundary guidance flag');

  // Test 8: Extractive Mock Generation
  const mockResult = await generateWithMock({
    query: 'What are good sleep hygiene habits?',
    contextPassages: searchKnowledge('healthy sleep hygiene habits', 3).results,
    systemPrompt: 'System prompt',
    boundaryGuidance: false
  });
  assert(mockResult.text.length > 100 && mockResult.text.includes('Sleep'),
    'Mock extractive generator produced rich synthesized response');

  // Test 9: Output Validation and Mandatory Disclaimer
  const validated = validateOutputSafety(mockResult.text);
  assert(validated.text.includes('general information, not medical advice') || validated.text.includes('Disclaimer:'),
    'Mandatory medical disclaimer is verified present in final response');

  console.log('\n====================================================');
  console.log(`Verification Complete: ${passCount} Passed, ${failCount} Failed.`);
  console.log('====================================================');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test run error:', err);
  process.exit(1);
});
