import React, { useEffect, useRef, useState } from 'react';
import useQueryParams from '../hooks/useQueryParams';
import { useRecipesActions, useRecipesState } from '../state/recipesContext';

/**
 * SearchBar controls the query in context and syncs with URL.
 */
export default function SearchBar() {
  const { query, loading } = useRecipesState();
  const { setQuery } = useRecipesActions();
  const [local, setLocal] = useState(query || '');
  const inputRef = useRef(null);

  // Install URL sync behavior
  useQueryParams();

  useEffect(() => {
    // Keep local input value in sync when query changes elsewhere (e.g., URL)
    setLocal(query || '');
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(local);
  };

  return (
    <form role="search" onSubmit={onSubmit} aria-label="Recipe search">
      <label style={{ position: 'relative', display: 'inline-block' }}>
        <span className="visually-hidden">Search recipes</span>
        <input
          ref={inputRef}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          type="search"
          placeholder="Search recipes"
          aria-label="Search recipes"
          className="input"
          style={{
            paddingRight: '2rem',
            minWidth: 200
          }}
        />
        <button
          type="submit"
          className="visually-hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span aria-hidden="true" style={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-secondary)'
        }}>{loading ? '⏳' : '🔎'}</span>
      </label>
    </form>
  );
}
