import { screen, render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('should render logo with src: logo.svg and alt: logo', () => {
    render(<Footer />);
    const logoImg = screen.getByRole('img');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'logo.svg');
    expect(logoImg).toHaveAttribute('alt', 'logo');
  });

  it('should render text: Prawa autorskie © 2022 Bking. Wszelkie prawa zastrzeżone', () => {
    render(<Footer />);
    expect(screen.getByText(/prawa autorskie © 2022 Bking. Wszelkie prawa zastrzeżone/i)).toBeInTheDocument();
  });
});
