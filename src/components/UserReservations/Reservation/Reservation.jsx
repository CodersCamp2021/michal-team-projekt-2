import React, { useState } from 'react';
import { dateConverter } from '../../../helpers/dateConverter';
import { datesDifference } from '../../../helpers/datesDifference';
import { Button } from '../../Button/Button';
import { Modal } from '../../Modal/Modal';
import styles from './Reservation.module.scss';

export const Reservation = ({ reservation }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => setIsOpenModal(false);
  const openModal = () => setIsOpenModal(true);
  const cancelReservation = () => {
    // call to api
    console.log('cancel ');
  };

  return (
    <>
      <div className={styles.reservation}>
        <img src={reservation.image} alt="" className={styles.reservationImage} />
        <div className={styles.reservationContainer}>
          <div>
            <h3 className={styles.reservationTitle}>{reservation.title}</h3>
            <p>{reservation.address}</p>
            <p>
              Zameldowanie:
              <span>{dateConverter(reservation.checkIn, 'fullDate')}</span>
            </p>
            <p>
              Wymeldowanie:
              <span>{dateConverter(reservation.checkOut, 'fullDate')}</span>
            </p>
            <p>
              Łączny koszt: <span>{reservation.price} zł</span>
            </p>
          </div>
          {datesDifference(new Date(), reservation.cancelDate) > 0 && (
            <Button handleClick={openModal} text="Anuluj rezerwację" />
          )}
        </div>
      </div>
      <Modal
        confirmBtnTxt="Tak"
        confirmBtnHandler={cancelReservation}
        isOpenModal={isOpenModal}
        closeBtnTxt="Anuluj"
        closeBtnHandler={closeModal}
      >
        Czy na pewno chcesz anulować rezerwację?
      </Modal>
    </>
  );
};
