import React from 'react';
import { Link } from 'react-router-dom';
import useSavedRecipes from '../hooks/useSavedRecipes';

/**
 * RecipeCard shows a minimal card with title and description and allows save/unsave.
 */
export default function RecipeCard({ id, title, description }) {
  const { isSaved, toggle } = useSavedRecipes();
  const saved = isSaved(id);

  return (
    <article className="card" style={{ padding: '0.9rem', textAlign: 'left', borderRadius: '14px', position: 'relative' }}>
      <button
        className="btn ghost"
        aria-label={saved ? 'Unsave recipe' : 'Save recipe'}
        aria-pressed={saved}
        title={saved ? 'Unsave recipe' : 'Save recipe'}
        onClick={() => toggle(id)}
        style={{ position: 'absolute', right: 10, top: 10, padding: '4px 8px', fontSize: 12 }}
      >
        {saved ? '★ Saved' : '☆ Save'}
      </button>
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
        <Link to={`/recipe/${id}`} className="link" aria-label={`View recipe: ${title}`}>
          {title}
        </Link>
      </h3>
      <p className="text-muted" style={{ marginBottom: 0 }}>{description}</p>
    </article>
  );
}
