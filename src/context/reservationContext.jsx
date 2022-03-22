import { useState, createContext, useContext, useEffect } from 'react';
import { useSearchContext } from './searchContext';

export const ReservationContext = createContext({});

export const ReservationProvider = ({ children }) => {
  const { state: searchState } = useSearchContext();
  const [state, setState] = useState({
    offer: {},
    checkIn: searchState.checkIn,
    checkOut: searchState.checkOut,
    guests: searchState.guests,
  });

  const updateReservation = (formData) => {
    setState((prevState) => ({ ...prevState, ...formData }));
  };

  const sendReservation = () => {};

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      checkIn: searchState.checkIn,
      checkOut: searchState.checkOut,
      guests: searchState.guests,
    }));
  }, [setState, searchState]);

  return (
    <ReservationContext.Provider value={{ state, updateReservation, sendReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error('Reservation context must be used within a ReservationProvider');
  return context;
};
