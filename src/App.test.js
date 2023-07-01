import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page with login link', () => {
  render(<App />);
  const linkElement = screen.getByText(/LOGIN/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders landing page buttons list', async () => {
  render(<App />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(2);
});

