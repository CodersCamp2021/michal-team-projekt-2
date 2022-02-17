import { render, screen } from '@testing-library/react';
import { Hamburger } from './Hamburger';

it('should render component with class name hamburger and with aria-label text Otwórz menu', () => {
  const onClick = jest.fn();
  render(<Hamburger isOpen={false} onClick={onClick} />);

  const hamburger = screen.getByLabelText(/otwórz menu/i);
  expect(hamburger).toBeInTheDocument();
  expect(hamburger).toHaveClass('hamburger');
});

it('should render component with class name hamburger, hamburgerActive and with aria-label text Zamknij menu', () => {
  const onClick = jest.fn();
  render(<Hamburger isOpen={true} onClick={onClick} />);

  const hamburger = screen.getByLabelText(/zamknij menu/i);
  expect(hamburger).toBeInTheDocument();
  expect(hamburger).toHaveClass('hamburger hamburgerActive');
});
