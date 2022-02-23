import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from './../../helpers/test-utils';

import { Logo } from './Logo';

describe('Logo', () => {
  it('should render logo with src: logo.svg and alt: logo', () => {
    renderWithRouter(<Logo />);
    const imgLogo = screen.getByRole('img');
    expect(imgLogo).toBeInTheDocument();
    expect(imgLogo).toHaveAttribute('src', 'logo.svg');
    expect(imgLogo).toHaveAttribute('alt', 'logo');
  });

  it('should back to homepage after clicking on logo', () => {
    renderWithRouter(<Logo />);
    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });
});
