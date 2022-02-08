import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

it('should render a button with class button', () => {
  render(<Button />);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('button');
});

it('should render a button with text content: My button', () => {
  render(<Button text="My button" />);
  const button = screen.getByText(/my button/i);
  expect(button).toBeInTheDocument();
});

it('should calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button text="Click me" handleClick={handleClick} />);
  const button = screen.getByText(/click me/i);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
