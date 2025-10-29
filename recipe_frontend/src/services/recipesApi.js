import rawRecipes from '../data/mockRecipes.json';

/**
 * NOTE ABOUT DATA LAYER
 * This module intentionally mimics an async API client. It currently serves mock data from JSON,
 * but the exported functions match shapes you'd expect from a REST client so we can swap later.
 *
 * TODO(backendswap):
 * - Replace memoryRecipes with network calls using fetch or your HTTP client of choice.
 * - Consider adding a BASE_URL from environment (e.g., REACT_APP_API_BASE_URL) rather than hardcoding.
 * - Each function below includes the minimal fetch signature you'd likely need; uncomment and adapt.
 */

// Example: Read from env for future REST backend
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Simple in-memory store to support session-only mutations (saveRecipe).
 * This keeps the mock compatible with a future backend by exposing async functions.
 */
let memoryRecipes = [...rawRecipes];

/**
 * Normalize strings for search (case-insensitive).
 */
function normalize(str) {
  return (str || '').toString().toLowerCase();
}

/**
 * Generate a lightweight, unique id for new recipes in the mock layer.
 */
function generateId() {
  const prefix = 'r-';
  // Find max numeric suffix among existing IDs
  const nums = memoryRecipes
    .map(r => (typeof r.id === 'string' ? r.id : `${prefix}000`).replace(prefix, ''))
    .map(s => parseInt(s, 10))
    .filter(n => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) + 1 : 1).toString().padStart(3, '0');
  return `${prefix}${next}`;
}

/**
 * Apply filtering by query, category, and tag to a recipe list.
 * Query matches title, tags, and ingredients.
 */
function applyFilters(recipes, { query, category, tag }) {
  let data = recipes;

  if (category && category !== 'All') {
    const catN = normalize(category);
    data = data.filter(r => (r.categories || []).some(c => normalize(c) === catN));
  }

  if (tag) {
    const tagN = normalize(tag);
    data = data.filter(r => (r.tags || []).some(t => normalize(t) === tagN));
  }

  if (query) {
    const q = normalize(query);
    data = data.filter(r => {
      const inTitle = normalize(r.title).includes(q);
      const inTags = (r.tags || []).some(t => normalize(t).includes(q));
      const inIngredients = (r.ingredients || []).some(i => normalize(i).includes(q));
      return inTitle || inTags || inIngredients;
    });
  }

  return data;
}

/**
 * Simulate async latency to mimic network behavior (very short).
 */
function delay(ms = 10) {
  return new Promise(res => setTimeout(res, ms));
}

// PUBLIC_INTERFACE
export async function listRecipes({ query = '', category = 'All', tag = '' } = {}) {
  /**
   * List recipes with optional filters.
   * Parameters:
   * - query: string to search in title, tags, and ingredients.
   * - category: exact match against categories (case-insensitive). 'All' returns all.
   * - tag: exact match against tags (case-insensitive).
   * Returns: Promise<Array<Recipe>>
   *
   * TODO(backendswap):
   * - Replace the mock filtering with a real request, e.g.:
   *   const params = new URLSearchParams({ q: query, cat: category, tag }).toString();
   *   const res = await fetch(`${BASE_URL}/recipes?${params}`);
   *   if (!res.ok) throw new Error('Failed to fetch recipes');
   *   return res.json();
   */
  await delay();
  const filtered = applyFilters(memoryRecipes, { query, category, tag });
  // Return lightweight objects or full objects; we return full for detail page reuse.
  return filtered;
}

// PUBLIC_INTERFACE
export async function getRecipeById(id) {
  /**
   * Get a single recipe by ID.
   * Parameters:
   * - id: string
   * Returns: Promise<Recipe | null>
   *
   * TODO(backendswap):
   * - Replace with network call, e.g.:
   *   const res = await fetch(`${BASE_URL}/recipes/${encodeURIComponent(id)}`);
   *   if (res.status === 404) return null;
   *   if (!res.ok) throw new Error('Failed to fetch recipe');
   *   return res.json();
   */
  await delay();
  const found = memoryRecipes.find(r => r.id === id || String(r.id) === String(id));
  return found || null;
}

// PUBLIC_INTERFACE
export async function listCategories() {
  /**
   * Return the distinct set of categories from the dataset.
   * Returns: Promise<Array<string>>
   *
   * TODO(backendswap):
   * - Replace with a dedicated endpoint or compute from list endpoint response:
   *   const res = await fetch(`${BASE_URL}/categories`);
   *   if (!res.ok) throw new Error('Failed to fetch categories');
   *   const categories = await res.json();
   *   return ['All', ...categories];
   */
  await delay();
  const set = new Set();
  memoryRecipes.forEach(r => (r.categories || []).forEach(c => set.add(c)));
  return ['All', ...Array.from(set).sort()];
}

// PUBLIC_INTERFACE
export async function saveRecipe(recipe) {
  /**
   * Save a new recipe to the in-memory store. No persistence across refreshes.
   * This is a no-op placeholder that appends to the session array.
   * Parameters:
   * - recipe: object (partial is okay, but should include title at minimum)
   * Returns: Promise<Recipe> (the saved recipe with assigned id)
   *
   * TODO(backendswap):
   * - Replace with POST call:
   *   const res = await fetch(`${BASE_URL}/recipes`, {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify(recipe),
   *   });
   *   if (!res.ok) throw new Error('Failed to create recipe');
   *   return res.json();
   *
   * - After saving, the UI currently prepends the returned recipe to context results.
   *   With a real backend, you might instead re-fetch listRecipes to ensure consistency.
   */
  await delay();

  const now = new Date().toISOString();
  const newRecipe = {
    id: generateId(),
    title: recipe.title || 'Untitled Recipe',
    image: recipe.image || '',
    categories: Array.isArray(recipe.categories) ? recipe.categories : ['Uncategorized'],
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
    time: recipe.time || { prep: 0, cook: 0, total: 0, unit: 'minutes' },
    servings: typeof recipe.servings === 'number' ? recipe.servings : 1,
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    _createdAt: now,
    _updatedAt: now
  };

  memoryRecipes = [newRecipe, ...memoryRecipes];
  return newRecipe;
}

/**
 * Default export for easy swapping in the future with a REST client.
 * Importers can either import named functions or the default object with same shape.
 */
const recipesApi = {
  listRecipes,
  getRecipeById,
  listCategories,
  saveRecipe
};

export default recipesApi;
