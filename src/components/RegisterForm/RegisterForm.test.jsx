import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { emailValidation, firstNameValidation, lastNameValidation, passwordValidation } from '../../helpers/validators';
import { RegisterForm } from './RegisterForm';

jest.mock('../../context/authContext', () => ({
  ...jest.requireActual('../../context/authContext'),
  useAuth: () => ({
    state: {
      status: 'unauthenticated',
      error: '',
    },
  }),
}));
const mockOnSubmit = jest.fn();

describe('RegisterForm', () => {
  it('should be rendered', () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/utwórz konto/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /imię:/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /nazwisko:/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/data urodzenia:/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /email:/i,
      }),
    ).toBeInTheDocument();

    const password = screen.getByLabelText(/^hasło/i);
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute('type', 'password');

    const repassword = screen.getByLabelText(/Powtórz hasło:/i);
    expect(repassword).toBeInTheDocument();
    expect(repassword).toHaveAttribute('type', 'password');

    expect(
      screen.getByRole('button', {
        name: /zarejestruj się/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display error message when name value length is less than 2', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(firstNameValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when name value length is equal 0', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(firstNameValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when name have incorrect format', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.type(input, '123');

    const errText = await screen.findByText(firstNameValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when lastname value length is less than 2', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(lastNameValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when lastname value length is equal 0', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(lastNameValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when lastname have incorrect format', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.type(input, '123');

    const errText = await screen.findByText(lastNameValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when email value length is less than 4', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(emailValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when email value length is equal 0', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(emailValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when email value is incorrect', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.type(input, 'aaaa');
    expect(input).toHaveValue('aaaa');

    const errText = await screen.findByText(emailValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when password value length is less than 8', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(passwordValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when password value length is equal 0', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(passwordValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when password value is incorrect', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, '12345678');
    expect(input).toHaveValue('12345678');

    const errText = await screen.findByText(passwordValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when passwords are not identical', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/powtórz hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText('Hasła muszą być identyczne');
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when age is less than 18', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/data urodzenia:/i);

    userEvent.type(input, '2020-02-02');
    expect(input).toHaveValue('2020-02-02');

    const errText = await screen.findByText('Musisz mieć skończone 18 lat aby móc się zarejestrować');
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not calls on submit function when form is invalid', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const button = screen.getByRole('button', {
      name: /zarejestruj się/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('should calls on submit function when form is valid', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const name = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.type(name, 'John');

    const lastName = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.type(lastName, 'Doe');

    const dob = screen.getByLabelText(/data urodzenia:/i);

    userEvent.type(dob, '1999-05-10');

    const email = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.type(email, 'john@doe.com');

    const password = screen.getByLabelText(/^hasło/i);

    userEvent.type(password, 'J0hnd0e12$');

    const repassword = screen.getByLabelText(/powtórz hasło/i);

    userEvent.type(repassword, 'J0hnd0e12$');

    const button = screen.getByRole('button', {
      name: /zarejestruj się/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
