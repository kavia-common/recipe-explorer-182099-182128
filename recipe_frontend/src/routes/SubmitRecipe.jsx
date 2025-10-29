import React from 'react';

/**
 * SubmitRecipe provides a simple placeholder form to contribute a recipe.
 */
export default function SubmitRecipe() {
  return (
    <section aria-labelledby="submit-heading" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 id="submit-heading">Submit a Recipe</h1>
      <p>Share your delicious creation with the community.</p>

      <form onSubmit={(e) => e.preventDefault()} aria-describedby="submit-help" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <label>
            Title
            <input type="text" name="title" placeholder="e.g., Cozy Tomato Soup" style={{ width: '100%', padding: '0.5rem' }} />
          </label>
          <label>
            Description
            <textarea name="description" rows={4} placeholder="Briefly describe your recipe" style={{ width: '100%', padding: '0.5rem' }} />
          </label>
          <button type="submit" className="btn">Submit</button>
        </div>
        <p id="submit-help" style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          This is a preview-only form for now.
        </p>
      </form>
    </section>
  );
}
