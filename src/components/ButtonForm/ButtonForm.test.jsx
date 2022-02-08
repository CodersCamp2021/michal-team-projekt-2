import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonForm } from './ButtonForm';

it('should render a button with class button', () => {
  render(<ButtonForm />);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('button');
});

it('should render a disabled button', () => {
  render(<ButtonForm disabled />);
  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
});

it('should render a button with text content: My button', () => {
  render(<ButtonForm name="My button" />);
  const button = screen.getByText(/my button/i);
  expect(button).toBeInTheDocument();
});
