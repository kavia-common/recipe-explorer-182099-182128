import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeCard shows a minimal card with title and description.
 */
export default function RecipeCard({ id, title, description }) {
  return (
    <article className="card" style={{ padding: '0.9rem', textAlign: 'left', borderRadius: '14px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
        <Link to={`/recipe/${id}`} className="link">
          {title}
        </Link>
      </h3>
      <p className="text-muted" style={{ marginBottom: 0 }}>{description}</p>
    </article>
  );
}
