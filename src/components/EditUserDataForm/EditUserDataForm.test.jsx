import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { firstNameValidation, lastNameValidation, emailValidation } from '../../helpers/validators';
import { EditUserDataForm } from './EditUserDataForm';

jest.mock('../../context/authContext', () => ({
  ...jest.requireActual('../../context/authContext'),
  useAuth: () => ({
    state: {
      status: 'authenticated',
      error: '',
    },
  }),
}));
const mockOnSubmit = jest.fn();

const user = {
  id: 1,
  firstName: 'Jan',
  lastName: 'Nowak',
  photo: null,
  dob: '04.01.1989',
  email: 'jan@nowak.pl',
  languages: ['polski, angielski, niemiecki'],
};

describe('EditUserDataForm', () => {
  it('should be rendered', () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    expect(
      screen.getByRole('textbox', {
        name: /imię:/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /imię:/i,
      }),
    ).toHaveValue('Jan');

    expect(
      screen.getByRole('textbox', {
        name: /nazwisko:/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /nazwisko:/i,
      }),
    ).toHaveValue('Nowak');

    expect(screen.getByText(/data urodzenia/i)).toBeInTheDocument();
    expect(screen.getByText(/04.01.1989/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/awatar:/i)).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /języki:/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /języki:/i,
      }),
    ).toHaveValue('polski, angielski, niemiecki');

    expect(
      screen.getByRole('textbox', {
        name: /email:/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /email:/i,
      }),
    ).toHaveValue('jan@nowak.pl');

    expect(
      screen.getByRole('button', {
        name: /zapisz zmiany/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display error message when name value length is less than 2', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.clear(input);
    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(firstNameValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when name value length is equal 0', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(firstNameValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when name have incorrect format', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /imię:/i,
    });

    userEvent.type(input, '123');

    const errText = await screen.findByText(firstNameValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when lastname value length is less than 2', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.clear(input);
    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(lastNameValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });
  it('should display error message when lastname value length is equal 0', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(lastNameValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when lastname have incorrect format', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /nazwisko:/i,
    });

    userEvent.type(input, '123');

    const errText = await screen.findByText(lastNameValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });
  it('should display error message when email value length is less than 4', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.clear(input);
    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(emailValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when email value length is equal 0', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(emailValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error message when email value is incorrect', async () => {
    render(<EditUserDataForm onSubmit={mockOnSubmit} userData={user} />);
    const input = screen.getByRole('textbox', {
      name: /email:/i,
    });

    userEvent.clear(input);
    userEvent.type(input, 'aaaa');
    expect(input).toHaveValue('aaaa');

    const errText = await screen.findByText(emailValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });
});
