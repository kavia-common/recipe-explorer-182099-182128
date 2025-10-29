import React from 'react';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import { useRecipesState } from '../state/recipesContext';

/**
 * RecipeList shows a grid of recipes with a category filter.
 */
export default function RecipeList() {
  const { results, loading, error } = useRecipesState();

  return (
    <section aria-labelledby="recipe-list-heading" className="page">
      <header
        className="surface"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '0.75rem 1rem',
          borderRadius: '14px',
          background:
            'radial-gradient(600px 200px at 100% 0%, rgba(139, 92, 246, 0.06), transparent 50%), var(--card-bg)'
        }}
      >
        <h1 id="recipe-list-heading" style={{ margin: 0 }}>Discover Recipes</h1>
        <CategoryFilter />
      </header>

      {error && (
        <div role="alert" className="surface" style={{ padding: '0.75rem', marginTop: '1rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div
        className="grid"
        style={{
          marginTop: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
        }}
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <article key={`skeleton-${i}`} className="card" style={{ padding: '0.9rem', borderRadius: '14px', opacity: 0.6 }}>
              <div style={{ height: 18, width: '70%', background: 'var(--border-color)', borderRadius: 8, marginBottom: 8 }} />
              <div style={{ height: 12, width: '95%', background: 'var(--border-color)', borderRadius: 8 }} />
            </article>
          ))
        ) : (
          results.map((r) => (
            <RecipeCard key={r.id} id={r.id} title={r.title} description={(r.instructions && r.instructions[0]) || 'Delicious recipe'} />
          ))
        )}
      </div>
    </section>
  );
}
