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
      <main id="main" role="main" style={{ flex: 1, padding: '1rem', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <Outlet />
      </main>
      <footer style={{ padding: '1rem', fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
        Recipe Explorer • Preview
      </footer>
    </div>
  );
}
