import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faker } from '@faker-js/faker';
import { emailValidation } from '../../helpers/validators';
import { RemindPasswordForm } from './RemindPasswordForm';

const mockFormData = {
  invalidEmail: faker.datatype.string(5),
  email: faker.internet.exampleEmail('abcd'),
};

describe('RemindPasswordForm', () => {
  it('should render fields', () => {
    render(<RemindPasswordForm />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /wyślij/i })).toBeInTheDocument();
  });

  it('should display pattern error when email value is invalid', async () => {
    render(<RemindPasswordForm />);
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: mockFormData.invalidEmail },
    });
    const errText = await screen.findByText(emailValidation.pattern.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display pattern error when email value is valid', async () => {
    render(<RemindPasswordForm />);
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: mockFormData.email },
    });
    const errText = screen.queryByText(emailValidation.pattern.message);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });
});
