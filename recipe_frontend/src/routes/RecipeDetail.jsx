import React from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

/**
 * RecipeDetail displays details for a single recipe.
 */
export default function RecipeDetail() {
  const { id } = useParams();

  return (
    <article aria-labelledby="recipe-detail-title" className="page" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 id="recipe-detail-title" style={{ marginBottom: '0.25rem' }}>Recipe #{id}</h1>
      <div className="header-accent" aria-hidden="true" style={{ width: 160, marginBottom: '0.75rem' }} />
      <p>This is a placeholder for the recipe details view.</p>
      <section aria-label="Ingredients" style={{ marginTop: '1rem' }}>
        <h2>Ingredients</h2>
        <ul>
          <li>1 cup Placeholder Ingredient A</li>
          <li>2 tbsp Placeholder Ingredient B</li>
        </ul>
      </section>
      <section aria-label="Instructions" style={{ marginTop: '1rem' }}>
        <h2>Instructions</h2>
        <ol>
          <li>Step one: Imagine something delicious.</li>
          <li>Step two: Enjoy!</li>
        </ol>
      </section>
      <EmptyState title="More coming soon" description="We will enrich this page with real content and actions." />
    </article>
  );
}
