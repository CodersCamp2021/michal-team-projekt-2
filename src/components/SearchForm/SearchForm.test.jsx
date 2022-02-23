import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { localisationValidation, guestsValidation } from '../../helpers/validators';
import { renderWithRouter } from '../../helpers/test-utils';
import { SearchForm } from './SearchForm';

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
  checkIn: '02/12/2022',
  checkOut: '03/12/2022',
  guests: 2,
};

describe('SearchForm', () => {
  it('should render fields', async () => {
    renderWithRouter(<SearchForm />);
    expect(await screen.findByRole('combobox', { name: /lokalizacja/i })).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /zameldowanie/i })).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /wymeldowanie/i })).toBeInTheDocument();
    expect(await screen.findByRole('spinbutton', { name: /Goście/i })).toBeInTheDocument();
    expect(await screen.findByRole('button')).toBeInTheDocument();
  });

  it('should display error when localisation value is invalid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: 'xy' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });
    const errText = await screen.findByText(localisationValidation.minLength.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display error when localisation value is valid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });
    const errText = screen.queryByText(localisationValidation.minLength.message);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });

  it('should display error when checkOut value is invalid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });

    const errText = await screen.findByText(/błędna data wymeldowania/i);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display error when checkOut value is valid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });

    const errText = screen.queryByText(/błędna data wymeldowania/i);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });

  it('should display error when checkIn value is invalid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });

    const errText = await screen.findByText(/błędna data zameldowania/i);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display error when checkIn value is valid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.input(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });

    const errText = screen.queryByText(/błędna data zameldowania/i);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });

  it('should display error when quests value is invalid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: 0 },
    });
    const errText = await screen.findByText(guestsValidation.min.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should not display error when quests value is valid', async () => {
    renderWithRouter(<SearchForm />);
    fireEvent.input(screen.getByRole('combobox', { name: /lokalizacja/i }), {
      target: { value: mockSearchFormData.localisation },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /zameldowanie/i }), {
      target: { value: mockSearchFormData.checkIn },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /wymeldowanie/i }), {
      target: { value: mockSearchFormData.checkOut },
    });
    fireEvent.input(screen.getByRole('spinbutton', { name: /goście/i }), {
      target: { value: mockSearchFormData.guests },
    });
    const errText = screen.queryByText(guestsValidation.min.message);
    await waitFor(() => expect(errText).not.toBeInTheDocument());
  });
});
