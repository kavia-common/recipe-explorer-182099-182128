import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
import userEvent from '@testing-library/user-event';
import mockRecipes from '../data/mockRecipes.json';

describe('RecipeDetail loading and render', () => {
  test('navigates to detail and renders content', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    // Click a specific recipe link from mock data
    const targetTitle = mockRecipes[0].title;
    await user.click(await screen.findByRole('link', { name: new RegExp(`view recipe: ${targetTitle}`, 'i') }));

    // Loading state appears first
    expect(await screen.findByText(/loading recipe…/i)).toBeInTheDocument();

    // Then detail header shows title
    expect(await screen.findByRole('heading', { name: new RegExp(targetTitle, 'i') })).toBeInTheDocument();

    // Ingredients and instructions headings visible
    expect(await screen.findByRole('heading', { name: /ingredients/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /instructions/i })).toBeInTheDocument();
  });

  test('invalid id shows error message', async () => {
    // Directly route to a non-existent id
    renderWithProviders(<App />, { route: '/recipe/does-not-exist' });

    // Loading then error alert
    expect(await screen.findByText(/loading recipe…/i)).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent(/recipe not found|failed to load/i);
  });
});
