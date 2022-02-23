import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Logo } from './Logo';

describe('Logo', () => {
  it('should render logo with src: logo.svg and alt: logo', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    const imgLogo = screen.getByRole('img');
    expect(imgLogo).toBeInTheDocument();
    expect(imgLogo).toHaveAttribute('src', 'logo.svg');
    expect(imgLogo).toHaveAttribute('alt', 'logo');
  });

  it('should back to homepage after clicking on logo', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Logo />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });
});
