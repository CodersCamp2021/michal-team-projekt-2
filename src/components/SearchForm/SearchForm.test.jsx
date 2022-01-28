import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchForm } from './SearchForm';

jest.mock('../../hooks/useFetchPlaces', () => ({
  useFetchPlaces: () => [],
}));

describe('SearchForm', () => {
  const mockSaveData = jest.fn();
  const mockFormData = {
    localisation: 'Warsaw',
    checkIn: '2022-01-27',
    checkOut: '2022-01-27',
    guests: 2,
  };

  it('should render fields', () => {
    render(<SearchForm saveData={mockSaveData} />);
    expect(screen.getByRole('combobox', { name: /lokalizacja/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /zameldowanie/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /wymeldowanie/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /Goście/i })).toBeInTheDocument();
  });

  it('calls on submit function with valid inputs', async () => {
    render(<SearchForm saveData={mockSaveData} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockFormData.guests },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    await waitFor(() => {
      expect(mockSaveData).toHaveBeenCalled();
    });
  });
  it('no calls on submit function with invalid inputs', async () => {
    render(<SearchForm saveData={mockSaveData} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: '' },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockFormData.guests },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    await waitFor(() => {
      expect(mockSaveData).not.toHaveBeenCalled();
    });
  });

  it('when invalid localisation renders the localisation validation error', async () => {
    render(<SearchForm saveData={mockSaveData} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: 'xy' },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockFormData.guests },
    });
    const errText = await screen.findByText(/niepoprawna lokalizacja/i);
    expect(errText).toBeInTheDocument();
  });

  it('when invalid checkIn in renders the checkIn validation error', async () => {
    render(<SearchForm saveData={mockSaveData} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: '2022-01-30' },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockFormData.guests },
    });

    const errText = await screen.findByText(/niepoprawna data zameldowania/i);
    expect(errText).toBeInTheDocument();
  });

  it('when invalid guests renders the guests validation error', async () => {
    render(<SearchForm saveData={mockSaveData} />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: 0 },
    });
    const errText = await screen.findByText(/niepoprawna liczba gości/i);
    expect(errText).toBeInTheDocument();
  });
});
