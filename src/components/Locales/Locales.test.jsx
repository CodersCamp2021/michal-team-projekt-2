import { screen, render, fireEvent } from '@testing-library/react';
import { Locales } from './Locales';

describe('Locales', () => {
  it('should show selected options from currency', () => {
    render(<Locales />);
    expect(screen.getByText('PLN')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    fireEvent.click(screen.getByText('PLN'));
    fireEvent.click(screen.getByText('EUR'));
  });

  it('should show selected options from language', () => {
    render(<Locales />);
    expect(screen.getByText('🇵🇱')).toBeInTheDocument();
    expect(screen.getByText('🇩🇪')).toBeInTheDocument();
    fireEvent.click(screen.getByText('🇵🇱'));
    fireEvent.click(screen.getByText('🇩🇪'));
  });
});
