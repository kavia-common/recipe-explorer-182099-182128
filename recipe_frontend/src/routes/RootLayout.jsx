import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

/**
 * RootLayout wraps pages with a top navigation and a responsive main area.
 */
export default function RootLayout() {
  return (
    <div className="root-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div className="gradient-bar" aria-hidden="true" />
      <main
        id="main"
        role="main"
        className="container"
        style={{ flex: 1, padding: '1rem 0', width: '100%' }}
      >
        <Outlet />
      </main>
      <footer style={{ padding: '1rem', fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
        Recipe Explorer • Preview
      </footer>
    </div>
  );
}
