import { render } from '@testing-library/react';
import App from './App';

// Smoke test: app renders without crashing
test('app renders', () => {
  render(<App />);
});
