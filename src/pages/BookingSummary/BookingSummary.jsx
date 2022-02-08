import { useEffect, useState } from 'react';
import { CheckInOut } from '../../components/CheckInOut/CheckInOut';
import { DetailsSummary } from '../../components/DetailsSummary/DetailsSummary';
import { Map } from '../../components/Map/Map';
import { PricesSummary } from '../../components/PricesSummary/PricesSummary';
import { sthWentWrongError } from '../../helpers/validators';
import styles from './BookingSummary.module.scss';

const request = {
  id: 100000123,
  title: 'Apartament z widokiem na morze',
  localisation: {
    address: 'Łazienkowska 3, Warszawa, Polska',
    phone: '+48 500 100 200',
    latitude: 52.22136,
    longitude: 21.04067,
  },
  price: 169,
  image:
    'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  checkIn: 'Sun Feb 20 2022 14:35:44 GMT+0100',
  checkInHours: '14:00 - 22:00',
  checkOut: 'Thu Feb 24 2022 14:35:44 GMT+0100',
  checkOutHours: '7:00 - 11:00',
  totalPrice: 676,
  status: 'zarezerwowany',
};

const getOffer = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(request), Math.random() * 1000);
  });
};

export const BookingSummary = () => {
  const [reservation, setReservation] = useState();

  useEffect(() => getOffer().then((data) => setReservation(data)), []);

  return (
    <section className={styles.bookingSummary}>
      {!reservation ? (
        sthWentWrongError.message
      ) : (
        <>
          <h2 className={styles.bookingSummaryTitle}>
            Podsumowanie rezerwacji nr
            <span> {reservation.id}</span>
          </h2>
          <div className={styles.bookingSummaryWrapper}>
            <DetailsSummary
              title={reservation.title}
              image={reservation.image}
              address={reservation.localisation.address}
              phone={reservation.localisation.phone}
              status={reservation.status}
            />
            <CheckInOut title="Zameldowanie" date={reservation.checkIn} hours={reservation.checkInHours} />
            <CheckInOut title="Wymeldowanie" date={reservation.checkOut} hours={reservation.checkOutHours} />
            <PricesSummary title="Opłaty" price={reservation.price} totalPrice={reservation.totalPrice} />
          </div>
          <Map location={reservation.localisation} />
        </>
      )}
    </section>
  );
};
