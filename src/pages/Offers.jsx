import React from 'react';
import { useSearchContext } from '../context/searchContext';

export const Offers = () => {
  const {
    state: { localisation, checkIn, checkOut, guests },
    offers,
  } = useSearchContext();
  console.log(offers);
  return (
    <>
      <h1>Offers Page / test SearchContext</h1>
      <ul>
        <li>Localisation: {localisation}</li>
        <li>CheckIn: {checkIn.toDateString()}</li>
        <li>CheckOut: {checkOut.toDateString()}</li>
        <li>Guests: {guests}</li>
      </ul>
    </>
  );
};
