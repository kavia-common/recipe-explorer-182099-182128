import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RootLayout from './routes/RootLayout';
import RecipeList from './routes/RecipeList';
import RecipeDetail from './routes/RecipeDetail';
import SavedRecipes from './routes/SavedRecipes';
import SubmitRecipe from './routes/SubmitRecipe';

// PUBLIC_INTERFACE
function App() {
  /**
   * App root sets a data-theme attribute for basic theming and
   * defines the top-level routes for the Recipe Explorer app.
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        aria-pressed={theme === 'dark'}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<RecipeList />} />
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="/submit" element={<SubmitRecipe />} />
          <Route path="*" element={<main style={{ padding: '2rem' }}><h1>404</h1><p>Page not found.</p></main>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
