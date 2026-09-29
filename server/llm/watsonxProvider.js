/**
 * IBM watsonx.ai Foundation Model Provider
 * Connects to IBM watsonx.ai text generation endpoint using IAM authentication.
 * Supports IBM Granite models (e.g., ibm/granite-13b-chat-v2, ibm/granite-3-8b-instruct)
 */

export async function generateWithWatsonx({ fullPrompt, systemPrompt }) {
  const apiKey = process.env.WATSONX_APIKEY || process.env.LLM_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  const url = process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com';
  const modelId = process.env.WATSONX_MODEL_ID || 'ibm/granite-3-8b-instruct';

  if (!apiKey) {
    throw new Error('IBM watsonx API key missing (set WATSONX_APIKEY or LLM_API_KEY).');
  }

  // Step 1: Exchange IBM Cloud API Key for IAM Bearer Token
  let iamToken = apiKey;
  if (!apiKey.startsWith('Bearer ')) {
    const tokenResponse = await fetch('https://iam.cloud.ibm.com/identity/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${encodeURIComponent(apiKey)}`
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.text();
      throw new Error(`Failed to authenticate with IBM Cloud IAM: ${errBody}`);
    }

    const tokenData = await tokenResponse.json();
    iamToken = tokenData.access_token;
  }

  // Step 2: Call watsonx.ai text generation endpoint
  const endpoint = `${url}/ml/v1/text/generation?version=2023-05-29`;
  const payload = {
    input: `${systemPrompt}\n\n${fullPrompt}`,
    parameters: {
      decoding_method: 'greedy',
      max_new_tokens: 600,
      min_new_tokens: 50,
      stop_sequences: ['\n\nUser:', '<|endoftext|>'],
      repetition_penalty: 1.1
    },
    model_id: modelId,
    project_id: projectId
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${iamToken}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`IBM watsonx API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const generatedText = data.results?.[0]?.generated_text || '';

  return {
    text: generatedText.trim(),
    model: modelId,
    provider: 'watsonx',
    metadata: {
      inputTokens: data.results?.[0]?.input_token_count,
      generatedTokens: data.results?.[0]?.generated_token_count
    }
  };
}
