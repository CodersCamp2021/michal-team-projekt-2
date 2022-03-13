import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  objectNameValidation,
  localisationValidation,
  objectDescriptionValidation,
  pictureInputValidation,
} from '../../helpers/validators';
import { AddObjectForm } from './AddObjectForm';

jest.mock('../../hooks/useFetchPlaces', () => ({
  useFetchPlaces: () => ({
    suggestions: [],
  }),
}));
jest.mock('../../context/searchContext', () => ({
  useSearchContext: () => ({
    search: jest.fn(),
    state: { localisation: 'Warsaw', checkIn: new Date(10, 0, 10), checkOut: new Date(10, 0, 10), guests: 2 },
  }),
}));

const mockSearchFormData = {
  localisation: 'Warsaw',
};

const mockOnSubmit = jest.fn();

describe('AddObjectForm', () => {
  it('should render object form component', () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/Dodaj swój obiekt/i)).toBeInTheDocument();
    expect(screen.getByText(/Udogodnienia/i)).toBeInTheDocument();
    expect(screen.getByText(/Regulamin obiektu/i)).toBeInTheDocument();
    expect(screen.getByText(/Nazwa obiektu/i)).toBeInTheDocument();
    expect(screen.getByText(/Lokalizacja/i)).toBeInTheDocument();
    expect(screen.getByText(/Galeria zdjęć/i)).toBeInTheDocument();
    expect(screen.getByText(/Opis obiektu/i)).toBeInTheDocument();
    expect(screen.getByText(/Język/i)).toBeInTheDocument();
    expect(screen.getByText(/Akceptowalne formy płatności/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dodaj Obiekt/i })).toBeInTheDocument();
  });

  it('should display error message when object name value length is less than 2', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', { name: /Nazwa obiektu/i });

    userEvent.type(input, 'x');
    expect(input).toHaveValue('x');

    const errorText = await screen.findByText(objectNameValidation.minLength.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should display error message when object name value length is too short', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', { name: /Nazwa obiektu/i });

    userEvent.type(input, 'x');
    expect(input).toHaveValue('x');
    userEvent.clear(input);
    expect(input).toHaveValue('');

    const errorText = await screen.findByText(objectNameValidation.required.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should display error message when localisation is invalid', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: 'xy' },
    });
    const errorText = await screen.findByText(localisationValidation.minLength.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should not display error when localisation value is valid', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    const errorText = screen.queryByText(localisationValidation.minLength.message);
    await waitFor(() => expect(errorText).not.toBeInTheDocument());
  });

  it('should display error message when there is no localisation', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('combobox', { name: /lokalizacja/i });
    userEvent.clear(input);
    fireEvent.submit(input);

    const errorText = await screen.findByText(localisationValidation.required.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should display error when there is no picture', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const input = screen.getByTestId('picture');
    userEvent.clear(input);
    fireEvent.submit(input);
    const errorText = await screen.findByText(pictureInputValidation.required.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should not display error when there is picture', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByTestId('picture'), {
      target: { value: [''] },
    });
    const errorText = screen.queryByText(pictureInputValidation.required.message);
    await waitFor(() => expect(errorText).not.toBeInTheDocument());
  });

  it('should display error when object description length is to short', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    fireEvent.input(screen.getByRole('textbox', { name: /opis obiektu/i }), { target: { value: 'xy' } });
    const errorText = await screen.findByText(objectDescriptionValidation.minLength.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should display error when object description is missing', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', { name: /opis obiektu/i });
    userEvent.clear(input);
    fireEvent.submit(input);
    const errorText = await screen.findByText(objectDescriptionValidation.required.message);
    await waitFor(() => expect(errorText).toBeInTheDocument());
  });

  it('should display selected language', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('combobox', { name: /język/i });
    const option1 = screen.getByRole('option', { name: /PL/i });
    userEvent.selectOptions(input, option1);
    await waitFor(() => expect(option1.selected).toBe(true));
  });

  it('should display the correct number of language options', () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    expect(screen.getAllByRole('option').length).toBe(2);
  });

  it('document should have 4 checkboxes', () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);
    const checkbox = screen.getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
  });

  it('should not call submit function when form is invalid', async () => {
    render(<AddObjectForm onSubmit={mockOnSubmit} />);

    const objectName = screen.getByRole('textbox', { name: /nazwa obiektu/i });
    userEvent.type(objectName, 'Ax');

    const objectDescription = screen.getByRole('textbox', { name: /opis obiektu/i });
    userEvent.type(objectDescription, 'tra');

    const regulations = screen.getByRole('textbox', { name: /Regulamin obiektu/i });
    userEvent.type(regulations, 'Nie tuptać po 22:00');

    const button = screen.getByRole('button', { name: /Dodaj Obiekt/i });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
