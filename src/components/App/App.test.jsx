import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders header links', () => {
  render(<App />);
  const registerLinkElement = screen.getByText(/Zarejestruj się/i);
  const loginLinkElement = screen.getByText(/Zaloguj się/i);

  expect(loginLinkElement).toBeInTheDocument();
  expect(registerLinkElement).toBeInTheDocument();
});
