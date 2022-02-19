import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

it('should render error component', () => {
  render(<ErrorMessage message="Error message" />);
  const error = screen.getByText(/error message/i);
  expect(error).toBeInTheDocument();
});
