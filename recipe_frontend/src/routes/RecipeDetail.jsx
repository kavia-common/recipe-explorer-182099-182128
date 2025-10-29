import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { getRecipeById } from '../services/recipesApi';
import useSavedRecipes from '../hooks/useSavedRecipes';

/**
 * RecipeDetail displays details for a single recipe loaded by id,
 * including metadata, ingredients, steps, and a save/unsave toggle.
 */
export default function RecipeDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { isSaved, toggle } = useSavedRecipes();

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipeById(id);
        if (!ignore) setRecipe(data);
      } catch (e) {
        if (!ignore) setError(e?.message || 'Failed to load recipe.');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);

  const saved = isSaved(String(id));

  if (loading) {
    return (
      <article className="page" style={{ maxWidth: 800, margin: '0 auto' }}>
        <p className="text-muted">Loading recipe…</p>
      </article>
    );
  }

  if (error || !recipe) {
    return (
      <article className="page" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div role="alert" className="surface" style={{ padding: '1rem' }}>
          <strong>Error:</strong> {error || 'Recipe not found.'}
        </div>
        <p style={{ marginTop: '0.75rem' }}>
          <Link to="/" className="link">Back to recipes</Link>
        </p>
      </article>
    );
  }

  const { title, categories = [], time, servings, ingredients = [], instructions = [], tags = [] } = recipe;

  return (
    <article aria-labelledby="recipe-detail-title" className="page" style={{ maxWidth: 800, margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', justifyContent: 'space-between' }}>
        <div>
          <h1 id="recipe-detail-title" style={{ marginBottom: '0.25rem' }}>{title}</h1>
          <div className="header-accent" aria-hidden="true" style={{ width: 200, marginBottom: '0.75rem' }} />
          <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
            {categories.join(' • ') || 'Uncategorized'}
            {typeof servings === 'number' ? ` • Serves ${servings}` : ''}
            {time?.total ? ` • ${time.total} ${time.unit || 'minutes'}` : ''}
          </p>
        </div>
        <button
          className={`btn ${saved ? 'secondary' : ''}`}
          aria-label={saved ? 'Unsave recipe' : 'Save recipe'}
          onClick={() => toggle(String(id))}
          title={saved ? 'Unsave' : 'Save'}
        >
          {saved ? '★ Saved' : '☆ Save'}
        </button>
      </header>

      {tags?.length ? (
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <span key={t} className="card" style={{ padding: '2px 8px', fontSize: 12, borderRadius: 999 }}>{t}</span>
          ))}
        </div>
      ) : null}

      <section aria-label="Ingredients" style={{ marginTop: '1rem' }}>
        <h2>Ingredients</h2>
        {ingredients.length ? (
          <ul>
            {ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
          </ul>
        ) : (
          <EmptyState title="No ingredients listed" description="This recipe does not include an ingredients list." />
        )}
      </section>

      <section aria-label="Instructions" style={{ marginTop: '1rem' }}>
        <h2>Instructions</h2>
        {instructions.length ? (
          <ol>
            {instructions.map((step, idx) => <li key={idx}>{step}</li>)}
          </ol>
        ) : (
          <EmptyState title="No instructions yet" description="This recipe has no instructions provided." />
        )}
      </section>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/" className="link">← Back to recipes</Link>
      </p>
    </article>
  );
}
