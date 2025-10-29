import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { RecipesProvider } from './state/recipesContext';

// PUBLIC_INTERFACE
export function renderWithProviders(ui, { route = '/', providerProps = {}, routerProps = {} } = {}) {
  /** Render a component wrapped with RecipesProvider and MemoryRouter for testing. */
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]} {...routerProps}>
      <RecipesProvider {...providerProps}>{children}</RecipesProvider>
    </MemoryRouter>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}

export default renderWithProviders;
