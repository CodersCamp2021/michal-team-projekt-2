import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../helpers/test-utils';
// eslint-disable-next-line
import authContext from '../../context/authContext';
import { Header } from './Header';

jest.mock('../../context/authContext', () => ({
  ...jest.requireActual('../../context/authContext'),
  useAuth: () => ({
    state: {
      status: 'unauthenticated',
    },
  }),
}));

describe('Header', () => {
  it('should render unauthenticated links when user is unauthenticated', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('link', { name: /zarejestruj się/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /zaloguj się/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /wyloguj się/i })).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/moje konto/i)).not.toBeInTheDocument();
  });

  it('should render authenticated links when user is authenticated', () => {
    jest.spyOn(authContext, 'useAuth').mockImplementationOnce(
      jest.fn(() => ({
        state: {
          status: 'authenticated',
        },
      })),
    );
    renderWithRouter(<Header />);
    expect(screen.getByRole('button', { name: /wyloguj się/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/moje konto/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /zarejestruj się/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /zaloguj się/i })).not.toBeInTheDocument();
  });
});
