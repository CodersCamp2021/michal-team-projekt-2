import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { passwordValidation } from '../../helpers/validators';
import { ResetPasswordForm } from './ResetPasswordForm';

const mockOnSubmit = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/reset-password?resetId=token',
  }),
}));

describe('ResetPasswordForm', () => {
  it('should be rendered', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByText(/Utwórz nowe hasło/i)).toBeInTheDocument();

    const password = screen.getByLabelText(/^hasło/i);
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute('type', 'password');

    const repassword = screen.getByLabelText(/Powtórz hasło:/i);
    expect(repassword).toBeInTheDocument();
    expect(repassword).toHaveAttribute('type', 'password');

    expect(
      screen.getByRole('button', {
        name: /Zmień hasło/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display error message when password value length is less than 8', async () => {
    render(<ResetPasswordForm />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(passwordValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when password value length is equal 0', async () => {
    render(<ResetPasswordForm />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(passwordValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when password value is incorrect', async () => {
    render(<ResetPasswordForm />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, '12345678');
    expect(input).toHaveValue('12345678');

    const errText = await screen.findByText(passwordValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when passwords are not identical', async () => {
    render(<ResetPasswordForm />);
    const input = screen.getByLabelText(/powtórz hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText('Hasła muszą być identyczne');
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not calls on submit function when form is invalid', async () => {
    render(<ResetPasswordForm />);

    const button = screen.getByRole('button', {
      name: /Zmień hasło/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('should calls on submit function when form is valid', async () => {
    render(<ResetPasswordForm />);

    const password = screen.getByLabelText(/^hasło/i);

    userEvent.type(password, 'J0hnd0e12$');

    const repassword = screen.getByLabelText(/powtórz hasło/i);

    userEvent.type(repassword, 'J0hnd0e12$');

    const button = screen.getByRole('button', {
      name: /Zmień hasło/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
  });
});
