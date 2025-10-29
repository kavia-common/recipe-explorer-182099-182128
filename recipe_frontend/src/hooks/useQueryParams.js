import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecipesActions, useRecipesState } from '../state/recipesContext';

// PUBLIC_INTERFACE
export default function useQueryParams() {
  /**
   * Syncs ?q and ?cat with RecipesContext state.
   * - On mount and when URL changes, updates context with current q/cat.
   * - When context changes via UI actions, updates the URL.
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { query, category } = useRecipesState();
  const { setQuery, setCategory } = useRecipesActions();

  // Initialize context from URL on first mount and whenever URL changes elsewhere
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('cat') || 'All';
    // Only update if different to avoid loops
    if (q !== query) setQuery(q);
    if (cat !== category) setCategory(cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Reflect context -> URL when user updates query/category via UI
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    const currentCat = searchParams.get('cat') || 'All';

    if (currentQ !== query || currentCat !== category) {
      const next = new URLSearchParams(searchParams);
      if (query) next.set('q', query);
      else next.delete('q');
      if (category && category !== 'All') next.set('cat', category);
      else next.delete('cat');

      // Avoid adding new history entries endlessly; replace is fine for filter changes
      const nextStr = next.toString();
      setSearchParams(next, { replace: true });

      // Optionally ensure we stay on the list route for filtering
      if (window.location.pathname !== '/') {
        navigate({ pathname: '/', search: nextStr ? `?${nextStr}` : '' }, { replace: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  return null; // this hook has no render output
}
