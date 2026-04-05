import { render, screen } from '@testing-library/react';
import App from './App';

test('renders foundation name', () => {
  render(<App />);
  const foundationElement = screen.getByText(/Cushing/i);
  expect(foundationElement).toBeInTheDocument();
});
