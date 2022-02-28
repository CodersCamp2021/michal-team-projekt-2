import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../helpers/test-utils';
import { UserAccountNav } from './UserAccountNav';

describe('UserAccountNav', () => {
  it('should be render', () => {
    renderWithRouter(<UserAccountNav />);
    expect(screen.getByText(/rezerwacje/i)).toHaveAttribute('href', '/account/reservations');
    expect(screen.getByText(/edytuj dane/i)).toHaveAttribute('href', '/account/edit');
    expect(screen.getByText(/zmień hasło/i)).toHaveAttribute('href', '/account/password');
  });
});
