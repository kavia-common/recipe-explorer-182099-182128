import React, { useEffect, useState } from 'react';
import useSavedRecipes from '../hooks/useSavedRecipes';
import { getRecipeById } from '../services/recipesApi';
import RecipeCard from '../components/RecipeCard';

/**
 * SavedRecipes shows a user's saved items.
 */
export default function SavedRecipes() {
  const { savedIds } = useSavedRecipes();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        const items = await Promise.all(savedIds.map((id) => getRecipeById(id)));
        if (!ignore) {
          setRecipes(items.filter(Boolean));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [savedIds]);

  return (
    <section aria-labelledby="saved-heading" className="page" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 id="saved-heading">Saved Recipes</h1>
      {loading ? (
        <p className="text-muted">Loading your saved recipes…</p>
      ) : recipes.length === 0 ? (
        <p className="text-muted">You haven’t saved any recipes yet.</p>
      ) : (
        <div
          className="grid"
          style={{
            marginTop: '1rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
          }}
        >
          {recipes.map((r) => (
            <RecipeCard key={r.id} id={r.id} title={r.title} description={(r.instructions && r.instructions[0]) || 'Delicious recipe'} />
          ))}
        </div>
      )}
    </section>
  );
}
