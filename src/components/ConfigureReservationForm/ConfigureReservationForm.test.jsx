import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { bedsValidation, guestsValidation } from '../../helpers/validators';
import { ConfigureReservationForm } from './ConfigureReservationForm';

describe.skip('ConfigureReservationForm', () => {
  const price = 189;

  it('should be rendered', () => {
    render(<ConfigureReservationForm price={price} />);
    expect(screen.getByLabelText(/Zameldowanie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Wymeldowanie/i)).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', {
        name: /Goście/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /konfiguracja łóżek/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('priceByNight')).toBeInTheDocument();
    expect(screen.getByTestId('priceByNight')).toHaveTextContent(`${price} zł/noc`);
    expect(screen.getByTestId('totalPrice')).toBeInTheDocument();
    expect(screen.getByTestId('totalPrice')).toHaveTextContent(`Razem (1 noc)${price} zł`);
    expect(
      screen.getByRole('button', {
        name: /rezerwuj/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display error if user doesnt select a beds configuration', async () => {
    render(<ConfigureReservationForm price={price} />);

    const button = screen.getByRole('button', {
      name: /rezerwuj/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);

    const errText = await screen.findByText(bedsValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should display error if input guests value is empty', async () => {
    render(<ConfigureReservationForm price={price} />);

    const input = screen.getByRole('spinbutton', {
      name: /Goście/i,
    });

    userEvent.clear(input);

    const button = screen.getByRole('button', {
      name: /rezerwuj/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.submit(button);

    const errText = await screen.findByText(guestsValidation.required.message);
    await waitFor(() => expect(errText).toBeInTheDocument());
  });

  it('should change the check in date', () => {
    render(<ConfigureReservationForm price={price} />);
    const input = screen.getByLabelText(/Zameldowanie/i);
    fireEvent.change(input, { target: { value: '24/02/2022' } });
    expect(input).toHaveValue('24/02/2022');
  });

  it('should change the check out date', () => {
    render(<ConfigureReservationForm price={price} />);
    const input = screen.getByLabelText(/wymeldowanie/i);
    fireEvent.change(input, { target: { value: '24/02/2022' } });
    expect(input).toHaveValue('24/02/2022');
  });

  it('should set check in date in check out field when the check in date is after check out date', () => {
    render(<ConfigureReservationForm price={price} />);
    const checkIn = screen.getByLabelText(/Zameldowanie/i);
    const checkOut = screen.getByLabelText(/wymeldowanie/i);

    fireEvent.change(checkOut, { target: { value: '2058-02-26' } });
    fireEvent.change(checkIn, { target: { value: '2058-02-28' } });

    expect(checkOut).toHaveValue('02/28/2058');
  });

  it('should display a correct total price', () => {
    render(<ConfigureReservationForm price={price} />);
    const checkIn = screen.getByLabelText(/Zameldowanie/i);
    const checkOut = screen.getByLabelText(/wymeldowanie/i);

    fireEvent.change(checkIn, { target: { value: '2024-02-26' } });
    fireEvent.change(checkOut, { target: { value: '2024-02-28' } });

    expect(screen.getByTestId('totalPrice')).toBeInTheDocument();
    expect(screen.getByTestId('totalPrice')).toHaveTextContent('Razem (2 noce)378 zł');
  });
});
