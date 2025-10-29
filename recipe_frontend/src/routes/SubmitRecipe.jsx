import React, { useMemo, useState } from 'react';
import { saveRecipe } from '../services/recipesApi';
import { useRecipesActions, useRecipesState } from '../state/recipesContext';

/**
 * SubmitRecipe provides a functional form to contribute a recipe into the mock store.
 * - Controlled inputs
 * - Basic validation (title required)
 * - On success: resets the form, shows confirmation, and prepends the new item to context results
 */
export default function SubmitRecipe() {
  const { results } = useRecipesState();
  const { setResults } = useRecipesActions();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [ingredientsText, setIngredientsText] = useState(''); // one per line
  const [instructionsText, setInstructionsText] = useState(''); // one per line
  const [categoriesText, setCategoriesText] = useState(''); // comma separated
  const [servings, setServings] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successId, setSuccessId] = useState('');

  const isValid = useMemo(() => title.trim().length > 0, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessId('');
    if (!isValid) {
      setError('Please provide a title for your recipe.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        categories: categoriesText
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
        ingredients: ingredientsText
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean),
        instructions: instructionsText
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean),
        servings: Number.isNaN(Number(servings)) ? 1 : Number(servings),
        time: { prep: 0, cook: 0, total: 0, unit: 'minutes' },
        tags: []
      };
      const saved = await saveRecipe(payload);
      // Prepend to current results so it appears immediately in the list
      setResults([saved, ...results]);
      setSuccessId(saved.id);
      // Reset form
      setTitle('');
      setDesc('');
      setIngredientsText('');
      setInstructionsText('');
      setCategoriesText('');
      setServings(1);
    } catch (e2) {
      setError(e2?.message || 'Failed to submit recipe.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section aria-labelledby="submit-heading" className="page" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 id="submit-heading" style={{ marginBottom: '0.25rem' }}>Submit a Recipe</h1>
      <div className="header-accent" aria-hidden="true" style={{ width: 180, marginBottom: '0.75rem' }} />
      <p>Share your delicious creation with the community.</p>

      {error && (
        <div role="alert" className="surface" style={{ padding: '0.75rem', marginTop: '0.5rem', borderLeft: '4px solid var(--color-error)' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {successId && (
        <div role="status" className="surface" style={{ padding: '0.75rem', marginTop: '0.5rem', borderLeft: '4px solid var(--color-success)' }}>
          ✅ Recipe submitted! It will appear in the list. (ID: {successId})
        </div>
      )}

      <form onSubmit={handleSubmit} aria-describedby="submit-help" style={{ marginTop: '1rem' }}>
        <div className="surface" style={{ display: 'grid', gap: '0.75rem', padding: '1rem' }}>
          <label>
            Title
            <input
              className="input"
              type="text"
              name="title"
              placeholder="e.g., Cozy Tomato Soup"
              style={{ width: '100%' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={!isValid}
              required
            />
          </label>

          <label>
            Short Description
            <textarea
              className="input"
              name="description"
              rows={3}
              placeholder="Briefly describe your recipe"
              style={{ width: '100%' }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>

          <label>
            Categories (comma separated)
            <input
              className="input"
              type="text"
              name="categories"
              placeholder="e.g., Dinner, Vegan"
              style={{ width: '100%' }}
              value={categoriesText}
              onChange={(e) => setCategoriesText(e.target.value)}
            />
          </label>

          <label>
            Servings
            <input
              className="input"
              type="number"
              min="1"
              name="servings"
              style={{ width: 120 }}
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </label>

          <label>
            Ingredients (one per line)
            <textarea
              className="input"
              name="ingredients"
              rows={5}
              placeholder={'e.g.,\n2 cups Vegetable broth\n1 Onion, chopped\nSalt to taste'}
              style={{ width: '100%' }}
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
            />
          </label>

          <label>
            Instructions (one step per line)
            <textarea
              className="input"
              name="instructions"
              rows={6}
              placeholder={'e.g.,\nSauté onions until translucent.\nAdd broth and simmer 10 minutes.\nBlend until smooth.'}
              style={{ width: '100%' }}
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
            />
          </label>

          <button type="submit" className="btn" disabled={saving || !isValid}>
            {saving ? 'Submitting…' : 'Submit'}
          </button>
        </div>
        <p id="submit-help" className="text-muted" style={{ fontSize: 12, marginTop: '0.5rem' }}>
          Preview demo: recipes are stored only in memory and will reset on refresh.
        </p>
      </form>
    </section>
  );
}
