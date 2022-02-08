import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonLarge } from './ButtonLarge';

it('should render a button with classes button, buttonLarge', () => {
  render(<ButtonLarge />);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('button');
  expect(button).toHaveClass('buttonLarge');
});

it('should render a button with text content: Button Large', () => {
  render(<ButtonLarge text="Button Large" />);
  const button = screen.getByText(/button large/i);
  expect(button).toBeInTheDocument();
});

it('should calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<ButtonLarge text="Click me" handleClick={handleClick} />);
  const button = screen.getByText(/click me/i);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
