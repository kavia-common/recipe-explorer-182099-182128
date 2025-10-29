import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

/**
 * NavBar provides top navigation and includes a SearchBar placeholder.
 */
export default function NavBar() {
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Main navigation"
      style={{
        padding: '0.75rem 1rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 800, letterSpacing: 0.2 }} title="Go to home">
          <span aria-hidden="true" style={{ marginRight: 6 }} role="img">🍳</span>
          <span>Recipe Explorer</span>
        </Link>

        <div role="menubar" aria-label="Primary" style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto', alignItems: 'center' }}>
          <NavLink
            to="/"
            end
            role="menuitem"
            style={({ isActive }) => ({
              textDecoration: 'none',
              padding: '6px 10px',
              borderRadius: '10px',
              background: isActive ? 'var(--gradient-primary)' : 'transparent',
              boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
              color: 'inherit'
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/saved"
            role="menuitem"
            style={({ isActive }) => ({
              textDecoration: 'none',
              padding: '6px 10px',
              borderRadius: '10px',
              background: isActive ? 'var(--gradient-primary)' : 'transparent',
              boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
              color: 'inherit'
            })}
          >
            Saved
          </NavLink>
          <NavLink
            to="/submit"
            role="menuitem"
            style={({ isActive }) => ({
              textDecoration: 'none',
              padding: '6px 10px',
              borderRadius: '10px',
              background: isActive ? 'var(--gradient-primary)' : 'transparent',
              boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
              color: 'inherit'
            })}
          >
            Submit
          </NavLink>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
