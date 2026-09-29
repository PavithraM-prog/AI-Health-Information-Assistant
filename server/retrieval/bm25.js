/**
 * BM25 (Best Matching 25) Information Retrieval Engine
 * Probabilistic ranking algorithm with term-frequency saturation,
 * document-length normalization, and title/keyword boost.
 */

// Common English stopwords to ignore in retrieval queries
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
  'let', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off',
  'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out',
  'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that',
  'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
  'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why',
  'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves', 'tell', 'explain',
  'give', 'please', 'help', 'know', 'can'
]);

/**
 * Tokenize and normalize text into clean lowercase stems/tokens
 */
export function tokenize(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

export class BM25Retriever {
  constructor(documents = [], k1 = 1.5, b = 0.75) {
    this.k1 = k1;
    this.b = b;
    this.documents = documents;
    this.docCount = documents.length;
    this.docLengths = [];
    this.avgDocLength = 0;
    this.termFrequencies = []; // Array of Map<term, count>
    this.docFrequency = new Map(); // Map<term, number_of_docs_containing_term>
    this.buildIndex();
  }

  buildIndex() {
    let totalLength = 0;
    this.docLengths = [];
    this.termFrequencies = [];
    this.docFrequency.clear();

    this.documents.forEach((doc, idx) => {
      // Body content tokens
      const bodyTokens = tokenize(doc.content || '');
      // Title tokens (weighted 2x)
      const titleTokens = tokenize(doc.title || '');
      // Keyword tokens (weighted 2x)
      const keywordTokens = tokenize((doc.keywords || []).join(' '));

      const termMap = new Map();

      // Helper to add tokens with weight
      const addTokens = (tokens, weight = 1) => {
        for (const token of tokens) {
          const current = termMap.get(token) || 0;
          termMap.set(token, current + weight);
        }
      };

      addTokens(bodyTokens, 1);
      addTokens(titleTokens, 2);
      addTokens(keywordTokens, 2);

      const docLength = bodyTokens.length + titleTokens.length * 2 + keywordTokens.length * 2;
      this.docLengths.push(docLength);
      totalLength += docLength;
      this.termFrequencies.push(termMap);

      // Track document frequency (each unique term counts once per doc)
      for (const term of termMap.keys()) {
        const count = this.docFrequency.get(term) || 0;
        this.docFrequency.set(term, count + 1);
      }
    });

    this.avgDocLength = this.docCount > 0 ? totalLength / this.docCount : 0;
  }

  /**
   * Calculate Robertson-Sparck Jones IDF
   */
  idf(term) {
    const n = this.docFrequency.get(term) || 0;
    // Standard Lucene/BM25 formula with smoothing
    return Math.log(1 + (this.docCount - n + 0.5) / (n + 0.5));
  }

  /**
   * Search for top-K passages matching a query
   * @param {string} query - The user search query
   * @param {number} topK - Number of results to return (default 3)
   * @param {number} threshold - Minimum score threshold to consider relevant
   */
  search(query, topK = 3, threshold = 0.3) {
    const queryTokens = tokenize(query);

    if (queryTokens.length === 0) {
      return {
        results: [],
        matchedTokens: [],
        maxScore: 0,
        isRelevant: false
      };
    }

    const scores = [];

    this.documents.forEach((doc, idx) => {
      let score = 0;
      const termMap = this.termFrequencies[idx];
      const docLen = this.docLengths[idx];
      const matched = [];

      for (const token of queryTokens) {
        if (termMap.has(token)) {
          const tf = termMap.get(token);
          const idfScore = this.idf(token);
          const numerator = tf * (this.k1 + 1);
          const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLength));
          const termScore = idfScore * (numerator / denominator);
          score += termScore;
          matched.push(token);
        }
      }

      scores.push({
        document: doc,
        score: Math.round(score * 100) / 100,
        matchedTokens: [...new Set(matched)]
      });
    });

    // Sort descending by BM25 score
    scores.sort((a, b) => b.score - a.score);

    const topResults = scores.slice(0, topK);
    const maxScore = topResults.length > 0 ? topResults[0].score : 0;
    const isRelevant = maxScore >= threshold;

    return {
      results: topResults,
      queryTokens,
      maxScore,
      isRelevant
    };
  }
}
