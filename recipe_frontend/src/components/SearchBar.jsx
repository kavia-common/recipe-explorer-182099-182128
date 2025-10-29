import React from 'react';

/**
 * SearchBar is a non-functional placeholder for now.
 */
export default function SearchBar() {
  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} aria-label="Recipe search">
      <label style={{ position: 'relative', display: 'inline-block' }}>
        <span className="visually-hidden">Search recipes</span>
        <input
          type="search"
          placeholder="Search recipes"
          aria-label="Search recipes"
          style={{
            padding: '0.4rem 0.6rem',
            borderRadius: 8,
            border: `1px solid var(--border-color)`,
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}
        />
      </label>
    </form>
  );
}
