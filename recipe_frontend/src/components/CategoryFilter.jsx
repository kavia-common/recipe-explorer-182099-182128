import React from 'react';

/**
 * CategoryFilter is a simple dropdown placeholder for categories.
 */
export default function CategoryFilter({ categories = [] }) {
  return (
    <label>
      <span className="visually-hidden">Filter by category</span>
      <select aria-label="Filter by category" defaultValue={categories[0]} style={{ padding: '0.4rem 0.6rem' }}>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
