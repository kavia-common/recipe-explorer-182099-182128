import App from './App';
import { renderWithProviders } from './test-utils';

// Smoke test: app renders without crashing and shows heading
test('app renders', async () => {
  const { findByRole } = renderWithProviders(<App />, { route: '/' });
  expect(await findByRole('heading', { name: /discover recipes/i })).toBeInTheDocument();
});
