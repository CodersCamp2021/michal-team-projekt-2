import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import { emailValidation, passwordValidation } from '../../helpers/validators';
import { renderWithRouter } from '../../helpers/test-utils';
import { LoginForm } from './LoginForm';

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
const mockFormData = {
  invalidEmail: faker.datatype.string(5),
  invalidPassword: faker.internet.password(4),
  email: faker.internet.exampleEmail('abcd'),
  password: '!Aa0' + faker.internet.password(6),
};

describe('LoginForm', () => {
  it('should render fields', () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zaloguj się/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /przypomnij hasło/i })).toBeInTheDocument();
  });

  it('calls on submit function with valid inputs', async () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: mockFormData.email },
    });
    fireEvent.input(screen.getByLabelText(/hasło/i), {
      target: { value: mockFormData.password },
    });
    fireEvent.submit(screen.getByTestId('login-form'));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('no calls onSubmit function with invalid inputs', async () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: mockFormData.invalidEmail },
    });
    fireEvent.input(screen.getByLabelText(/hasło/i), {
      target: { value: mockFormData.invalidPassword },
    });
    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('should display error when email value is invalid', async () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: mockFormData.invalidEmail },
    });
    const errText = await screen.findByText(emailValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display error when email value is valid', async () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: mockFormData.email },
    });
    const errText = screen.queryByText(emailValidation.pattern.message);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });

  it('should display error when password value is valid', async () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByLabelText('Hasło:'), {
      target: { value: mockFormData.invalidPassword },
    });
    const errText = await screen.findByText(passwordValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display error when password value is valid', async () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByLabelText('Hasło:'), {
      target: { value: mockFormData.password },
    });
    const errText = screen.queryByText(passwordValidation.minLength.message);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });

  it('should navigate to /remind-password when link is clicked', () => {
    renderWithRouter(<LoginForm onSubmit={mockOnSubmit} />);
    const link = screen.getByRole('link', { name: /przypomnij hasło/i });
    fireEvent.click(link);
    expect(link).toHaveAttribute('href', '/remind-password');
  });
});
