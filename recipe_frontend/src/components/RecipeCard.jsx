import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeCard shows a minimal card with title and description.
 */
export default function RecipeCard({ id, title, description }) {
  return (
    <article
      style={{
        border: `1px solid var(--border-color)`,
        borderRadius: 12,
        padding: '0.75rem',
        background: 'var(--bg-primary)',
        textAlign: 'left'
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </h3>
      <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>{description}</p>
    </article>
  );
}
