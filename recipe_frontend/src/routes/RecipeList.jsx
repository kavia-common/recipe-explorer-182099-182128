import React from 'react';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';

/**
 * RecipeList shows a grid of recipes with a simple category filter.
 */
export default function RecipeList() {
  const placeholderRecipes = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `Sample Recipe ${i + 1}`,
    description: 'A tasty placeholder dish to showcase the grid.',
    category: i % 2 === 0 ? 'Dinner' : 'Dessert',
  }));

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
        <CategoryFilter categories={['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']} />
      </header>
      <div
        className="grid"
        style={{
          marginTop: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
        }}
      >
        {placeholderRecipes.map((r) => (
          <RecipeCard key={r.id} id={r.id} title={r.title} description={r.description} />
        ))}
      </div>
    </section>
  );
}
