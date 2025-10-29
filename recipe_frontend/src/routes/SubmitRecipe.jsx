import React from 'react';

/**
 * SubmitRecipe provides a simple placeholder form to contribute a recipe.
 */
export default function SubmitRecipe() {
  return (
    <section aria-labelledby="submit-heading" className="page" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 id="submit-heading" style={{ marginBottom: '0.25rem' }}>Submit a Recipe</h1>
      <div className="header-accent" aria-hidden="true" style={{ width: 180, marginBottom: '0.75rem' }} />
      <p>Share your delicious creation with the community.</p>

      <form onSubmit={(e) => e.preventDefault()} aria-describedby="submit-help" style={{ marginTop: '1rem' }}>
        <div className="surface" style={{ display: 'grid', gap: '0.75rem', padding: '1rem' }}>
          <label>
            Title
            <input className="input" type="text" name="title" placeholder="e.g., Cozy Tomato Soup" style={{ width: '100%' }} />
          </label>
          <label>
            Description
            <textarea className="input" name="description" rows={4} placeholder="Briefly describe your recipe" style={{ width: '100%' }} />
          </label>
          <button type="submit" className="btn">Submit</button>
        </div>
        <p id="submit-help" className="text-muted" style={{ fontSize: 12, marginTop: '0.5rem' }}>
          This is a preview-only form for now.
        </p>
      </form>
    </section>
  );
}
