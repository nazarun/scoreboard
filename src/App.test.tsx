import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Scoreboard title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Scoreboard/i);
  expect(linkElement).toBeInTheDocument();
});
