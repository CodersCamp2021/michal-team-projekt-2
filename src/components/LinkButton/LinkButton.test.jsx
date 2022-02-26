import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../helpers/test-utils';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  const mockOnClick = jest.fn();
  it('should render link with text test and aria-label test-button', () => {
    renderWithRouter(
      <LinkButton path="/" ariaLabel="test-button" onClick={mockOnClick} upper={false}>
        test
      </LinkButton>,
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/test-button/i)).toBeInTheDocument();
  });

  it('should render link with correct href attribute', () => {
    renderWithRouter(
      <LinkButton path="/" ariaLabel="test-button" onClick={mockOnClick} upper={false}>
        test
      </LinkButton>,
    );
    expect(screen.getByRole('link', { name: /test-button/i })).toHaveAttribute('href', '/');
  });

  it('should render link with buttonUpper class when upper is true', () => {
    renderWithRouter(
      <LinkButton path="/" ariaLabel="test-button" onClick={mockOnClick} upper={true}>
        test
      </LinkButton>,
    );
    expect(screen.getByRole('link', { name: /test-button/i })).toHaveClass('buttonUpper');
  });
});
