import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { passwordValidation } from '../../helpers/validators';
import { EditPasswordForm } from './EditPasswordForm';

const mockOnSubmit = jest.fn();

describe('EditPasswordForm', () => {
  it.skip('should display error message when old password value length is less than 8', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/stare hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(passwordValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it.skip('should display error message when old password value length is equal 0', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/stare hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(passwordValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it.skip('should display error message when old password value is incorrect', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/stare hasło/i);

    userEvent.type(input, '12345678');
    expect(input).toHaveValue('12345678');

    const errText = await screen.findByText(passwordValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it.skip('should display error message when password value length is less than 8', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText(passwordValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it.skip('should display error message when password value length is equal 0', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errText = await screen.findByText(passwordValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it.skip('should display error message when password value is incorrect', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/^hasło/i);

    userEvent.type(input, '12345678');
    expect(input).toHaveValue('12345678');

    const errText = await screen.findByText(passwordValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it.skip('should display error message when passwords are not identical', async () => {
    render(<EditPasswordForm onSubmit={mockOnSubmit} />);
    const input = screen.getByLabelText(/powtórz hasło/i);

    userEvent.type(input, 'a');
    expect(input).toHaveValue('a');

    const errText = await screen.findByText('Hasła muszą być identyczne');
    await waitFor(() => expect(errText).toBeInTheDocument());
  });
});
