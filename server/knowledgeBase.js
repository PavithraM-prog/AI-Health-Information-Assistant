import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BM25Retriever } from './retrieval/bm25.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KNOWLEDGE_DIR = path.resolve(__dirname, '../knowledge');

let documents = [];
let retriever = null;

/**
 * Load knowledge base files from disk
 */
export function loadKnowledgeBase() {
  try {
    const files = fs.readdirSync(KNOWLEDGE_DIR).filter(file => file.endsWith('.json') && file !== 'index.json');
    documents = [];

    for (const file of files) {
      const filePath = path.join(KNOWLEDGE_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      try {
        const parsed = JSON.parse(raw);
        if (parsed.id && parsed.title && parsed.content) {
          documents.push(parsed);
        }
      } catch (err) {
        console.error(`Error parsing knowledge file ${file}:`, err);
      }
    }

    console.log(`Loaded ${documents.length} verified health documents into knowledge base.`);
    retriever = new BM25Retriever(documents);
    return documents;
  } catch (error) {
    console.error('Failed to load knowledge base from directory:', error);
    return [];
  }
}

/**
 * Get all loaded documents
 */
export function getAllDocuments() {
  if (documents.length === 0) {
    loadKnowledgeBase();
  }
  return documents;
}

/**
 * Get a specific document by its unique ID
 */
export function getDocumentById(id) {
  return documents.find(doc => doc.id === id) || null;
}

/**
 * Search the knowledge base using BM25
 */
export function searchKnowledge(query, topK = 3) {
  if (!retriever) {
    loadKnowledgeBase();
  }
  return retriever.search(query, topK);
}
