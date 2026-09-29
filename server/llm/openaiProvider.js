/**
 * OpenAI Provider
 * Connects to OpenAI chat completions endpoint using OPENAI_API_KEY or LLM_API_KEY
 */

export async function generateWithOpenAI({ fullPrompt, systemPrompt }) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    throw new Error('OpenAI API key missing (set OPENAI_API_KEY or LLM_API_KEY).');
  }

  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const payload = {
    model: model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: fullPrompt }
    ],
    temperature: 0.2,
    max_tokens: 800
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';

  return {
    text: text.trim(),
    model: model,
    provider: 'openai',
    metadata: {
      usage: data.usage
    }
  };
}
