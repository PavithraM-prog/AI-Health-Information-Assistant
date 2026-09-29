/**
 * Swappable LLM Provider Router
 * Selects between IBM watsonx.ai, Gemini, OpenAI, or the Extractive Mock Provider.
 */

import { generateWithMock } from './mockProvider.js';
import { generateWithWatsonx } from './watsonxProvider.js';
import { generateWithGemini } from './geminiProvider.js';
import { generateWithOpenAI } from './openaiProvider.js';

export async function generateHealthResponse({
  query,
  contextPassages,
  systemPrompt,
  constructedPrompt,
  boundaryGuidance
}) {
  const provider = (process.env.LLM_PROVIDER || '').toLowerCase();
  const apiKey = process.env.LLM_API_KEY || process.env.WATSONX_APIKEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  console.log(`[LLM Router] Requested Provider: "${provider || 'auto'}" | Key Present: ${!!apiKey}`);

  // Fall back immediately to mock generator if no key is provided
  if (!apiKey && provider !== 'mock') {
    console.log('[LLM Router] No LLM API key detected. Using robust Extractive Mock Generator.');
    return await generateWithMock({ query, contextPassages, systemPrompt, boundaryGuidance });
  }

  try {
    if (provider === 'watsonx' || (!provider && (process.env.WATSONX_APIKEY || process.env.WATSONX_PROJECT_ID))) {
      return await generateWithWatsonx({ fullPrompt: constructedPrompt, systemPrompt });
    }

    if (provider === 'gemini' || (!provider && process.env.GEMINI_API_KEY)) {
      return await generateWithGemini({ fullPrompt: constructedPrompt, systemPrompt });
    }

    if (provider === 'openai' || (!provider && process.env.OPENAI_API_KEY)) {
      return await generateWithOpenAI({ fullPrompt: constructedPrompt, systemPrompt });
    }

    // Default if provider is explicitly set to mock or unrecognized
    return await generateWithMock({ query, contextPassages, systemPrompt, boundaryGuidance });
  } catch (err) {
    console.error(`[LLM Router] Provider error (${provider || 'active'}):`, err.message);
    console.log('[LLM Router] Falling back gracefully to Extractive Mock Generator.');
    const fallbackResult = await generateWithMock({ query, contextPassages, systemPrompt, boundaryGuidance });
    fallbackResult.metadata = {
      ...fallbackResult.metadata,
      fallbackNotice: `Notice: Switched to extractive fallback due to external API notice: ${err.message}`
    };
    return fallbackResult;
  }
}
