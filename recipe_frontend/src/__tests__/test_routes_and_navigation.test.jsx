import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('App routes and navigation', () => {
  test('renders home route by default and shows Discover Recipes heading', async () => {
    renderWithProviders(<App />, { route: '/' });
    expect(await screen.findByRole('heading', { name: /discover recipes/i })).toBeInTheDocument();
  });

  test('navigates to Saved and back to Home via NavBar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    // Go to Saved
    await user.click(await screen.findByRole('menuitem', { name: /saved/i }));
    expect(await screen.findByRole('heading', { name: /saved recipes/i })).toBeInTheDocument();

    // Back to Home
    await user.click(await screen.findByRole('menuitem', { name: /home/i }));
    expect(await screen.findByRole('heading', { name: /discover recipes/i })).toBeInTheDocument();
  });

  test('navigates to Submit route', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    await user.click(await screen.findByRole('menuitem', { name: /submit/i }));
    expect(await screen.findByRole('heading', { name: /submit a recipe/i })).toBeInTheDocument();
  });
});
