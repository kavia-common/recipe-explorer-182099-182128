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
          className="input"
          style={{
            paddingRight: '2rem',
            minWidth: 200
          }}
        />
        <span aria-hidden="true" style={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-secondary)'
        }}>🔎</span>
      </label>
    </form>
  );
}
