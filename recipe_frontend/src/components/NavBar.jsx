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
        background: 'var(--bg-secondary)',
        borderBottom: `1px solid var(--border-color)`,
        padding: '0.75rem 1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 1200, margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
          🍳 Recipe Explorer
        </Link>

        <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto', alignItems: 'center' }}>
          <NavLink to="/" end style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            Home
          </NavLink>
          <NavLink to="/saved" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            Saved
          </NavLink>
          <NavLink to="/submit" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            Submit
          </NavLink>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
