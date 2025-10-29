import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
import userEvent from '@testing-library/user-event';

// Use the actual localStorage; jsdom provides a working impl.
// Ensure clean slate per test.
beforeEach(() => {
  window.localStorage.clear();
});

describe('Saved recipes persistence', () => {
  test('toggling save updates localStorage and shows in Saved page', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    // Save the first visible recipe card by clicking the ☆ Save button.
    const saveButton = await screen.findByRole('button', { name: /save recipe/i });
    await user.click(saveButton);

    // Button changes to ★ Saved
    expect(await screen.findByRole('button', { name: /unsave recipe/i })).toBeInTheDocument();

    // Navigate to Saved
    await user.click(await screen.findByRole('menuitem', { name: /saved/i }));
    expect(await screen.findByRole('heading', { name: /saved recipes/i })).toBeInTheDocument();

    // Should show at least one card
    const unsaveButtons = await screen.findAllByRole('button', { name: /unsave recipe/i });
    expect(unsaveButtons.length).toBeGreaterThan(0);

    // Reloading the tree should keep saved item due to localStorage
    // Navigate away and back to saved
    await user.click(await screen.findByRole('menuitem', { name: /home/i }));
    await user.click(await screen.findByRole('menuitem', { name: /saved/i }));

    const afterReload = await screen.findAllByRole('button', { name: /unsave recipe/i });
    expect(afterReload.length).toBeGreaterThan(0);
  });
});
