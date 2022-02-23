import { render, screen } from '@testing-library/react';
import { CheckInOut } from './CheckInOut';

it('should render a component with correct values', () => {
  render(<CheckInOut title="Apartament" date="2022-02-17T19:48:25.944Z" hours="10:00 - 17:00" />);
  const title = screen.getByText(/apartament/i);
  expect(title).toBeInTheDocument();

  const day = screen.getByText('17');
  expect(day).toBeInTheDocument();

  const month = screen.getByText('luty');
  expect(month).toBeInTheDocument();

  const weekday = screen.getByText('czwartek');
  expect(weekday).toBeInTheDocument();

  const checkInHours = screen.getByText('10:00 - 17:00');
  expect(checkInHours).toBeInTheDocument();
});
