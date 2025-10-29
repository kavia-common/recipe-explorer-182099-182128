import React from 'react';
import { screen, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
import userEvent from '@testing-library/user-event';
import mockRecipes from '../data/mockRecipes.json';

function expectSomeRecipeTitlesPresent() {
  // Basic sanity: from mock dataset, some titles should appear after initial load.
  const titles = mockRecipes.slice(0, 2).map(r => r.title);
  return Promise.all(titles.map(async (t) => {
    expect(await screen.findByRole('link', { name: new RegExp(`view recipe: ${t}`, 'i') })).toBeInTheDocument();
  }));
}

describe('Search and Category filter', () => {
  test('search filters results by query across title/ingredients/tags', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    // Initial list should show items
    await expectSomeRecipeTitlesPresent();

    // Search for a unique word in dataset e.g., "blueberry"
    const search = await screen.findByRole('search');
    const input = within(search).getByRole('searchbox', { name: /search recipes/i });
    await user.clear(input);
    await user.type(input, 'blueberry');
    // submit by pressing Enter triggers form submit
    await user.keyboard('{Enter}');

    // Should see Blueberry Pancakes and not see unrelated title like "Lentil Soup"
    expect(await screen.findByRole('link', { name: /view recipe: blueberry pancakes/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view recipe: hearty lentil soup/i })).not.toBeInTheDocument();
  });

  test('category filter narrows to selected category', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    // Wait for categories to load and filter to render
    const select = await screen.findByLabelText(/filter by category/i);
    // Choose Breakfast, should include Blueberry Pancakes and exclude Dinner items like Pizza
    await user.selectOptions(select, 'Breakfast');

    expect(await screen.findByRole('link', { name: /view recipe: blueberry pancakes/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view recipe: classic margherita pizza/i })).not.toBeInTheDocument();
  });

  test('search + category reflect in heading summary', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    const select = await screen.findByLabelText(/filter by category/i);
    await user.selectOptions(select, 'Lunch');

    const search = await screen.findByRole('search');
    const input = within(search).getByRole('searchbox', { name: /search recipes/i });
    await user.clear(input);
    await user.type(input, 'chickpea');
    await user.keyboard('{Enter}');

    // Heading summary shows both
    const subline = await screen.findByText(/category: lunch/i);
    expect(subline).toBeInTheDocument();
    expect(await screen.findByText(/search:\s*“chickpea”/i)).toBeInTheDocument();
  });
});
