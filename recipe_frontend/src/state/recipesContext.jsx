import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { listRecipes, listCategories } from '../services/recipesApi';

/**
 * RecipesContext centralizes search query, category, tags, and fetched results.
 * It also exposes dispatcher helpers to mutate the state from components.
 */

const RecipesStateContext = createContext(undefined);
const RecipesDispatchContext = createContext(undefined);

// Initial state for the recipes view
const initialState = {
  query: '',
  category: 'All',
  tags: [], // reserved for future usage
  results: [],
  categories: ['All'],
  loading: false,
  error: null
};

// Reducer handles the accepted actions
function recipesReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload ?? '' };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload ?? 'All' };
    case 'SET_RESULTS':
      return { ...state, results: Array.isArray(action.payload) ? action.payload : [] };
    case 'TOGGLE_SAVE':
      // This action doesn't alter state here; saved state is managed by useSavedRecipes.
      // We keep it to satisfy interface compatibility and future cross-state syncing.
      return state;
    case 'SET_CATEGORIES':
      return { ...state, categories: Array.isArray(action.payload) ? action.payload : ['All'] };
    case 'SET_LOADING':
      return { ...state, loading: !!action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload || null };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function RecipesProvider({ children, defaultQuery = '', defaultCategory = 'All' }) {
  /**
   * RecipesProvider manages searching/fetching and exposes state + actions.
   * Props:
   * - defaultQuery: initial search term
   * - defaultCategory: initial category
   * Returns a context provider.
   */
  const [state, dispatch] = useReducer(recipesReducer, {
    ...initialState,
    query: defaultQuery,
    category: defaultCategory
  });

  // Helper to perform search based on current state
  const performSearch = async (query, category) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const [results, categories] = await Promise.all([
        listRecipes({ query, category }),
        listCategories()
      ]);
      dispatch({ type: 'SET_RESULTS', payload: results });
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err?.message || 'Failed to load recipes' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Run search whenever query/category change
  useEffect(() => {
    performSearch(state.query, state.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.query, state.category]);

  const actions = useMemo(() => ({
    // PUBLIC_INTERFACE
    setQuery: (q) => dispatch({ type: 'SET_QUERY', payload: q }),
    // PUBLIC_INTERFACE
    setCategory: (cat) => dispatch({ type: 'SET_CATEGORY', payload: cat }),
    // PUBLIC_INTERFACE
    setResults: (results) => dispatch({ type: 'SET_RESULTS', payload: results }),
    // PUBLIC_INTERFACE
    toggleSave: (id) => dispatch({ type: 'TOGGLE_SAVE', payload: id })
  }), []);

  const stateValue = useMemo(() => state, [state]);

  return (
    <RecipesDispatchContext.Provider value={actions}>
      <RecipesStateContext.Provider value={stateValue}>
        {children}
      </RecipesStateContext.Provider>
    </RecipesDispatchContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useRecipesState() {
  /** Hook to read recipes state. */
  const ctx = useContext(RecipesStateContext);
  if (ctx === undefined) {
    throw new Error('useRecipesState must be used within a RecipesProvider');
  }
  return ctx;
}

// PUBLIC_INTERFACE
export function useRecipesActions() {
  /** Hook to read recipes actions. */
  const ctx = useContext(RecipesDispatchContext);
  if (ctx === undefined) {
    throw new Error('useRecipesActions must be used within a RecipesProvider');
  }
  return ctx;
}

export default RecipesProvider;
