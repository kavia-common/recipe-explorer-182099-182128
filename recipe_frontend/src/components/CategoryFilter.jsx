import React, { useEffect, useState } from 'react';
import useQueryParams from '../hooks/useQueryParams';
import { useRecipesActions, useRecipesState } from '../state/recipesContext';

/**
 * CategoryFilter binds to global category filter in context.
 */
export default function CategoryFilter({ categories: categoriesProp = [] }) {
  const { category, categories } = useRecipesState();
  const { setCategory } = useRecipesActions();
  const [local, setLocal] = useState(category || 'All');

  // Ensure URL <-> context sync
  useQueryParams();

  useEffect(() => {
    setLocal(category || 'All');
  }, [category]);

  const list = categories?.length ? categories : (categoriesProp?.length ? categoriesProp : ['All']);

  const onChange = (e) => {
    const next = e.target.value;
    setLocal(next);
    setCategory(next);
  };

  return (
    <label htmlFor="category-filter">
      <span className="visually-hidden">Filter by category</span>
      <select
        id="category-filter"
        aria-label="Filter by category"
        value={local}
        onChange={onChange}
        className="input"
        style={{ paddingRight: '1.75rem' }}
      >
        {list.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
