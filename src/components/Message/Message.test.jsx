import { render, screen } from '@testing-library/react';
import { Message } from './Message';

it('should render error component', () => {
  render(<Message message="Error message" />);
  const error = screen.getByText(/error message/i);
  expect(error).toBeInTheDocument();
});
