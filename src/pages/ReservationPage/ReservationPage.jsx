import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../helpers/axiosClient';
import { datesDifference } from '../../helpers/datesDifference';
import { SectionWithUnderlineTitle } from '../../components/SectionWithUnderlineTitle/SectionWithUnderlineTitle';
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel';
import { RadioButtons } from '../../components/RadioButtons/RadioButtons';
import { Modal } from '../../components/Modal/Modal';
import { Loading } from '../../components/Loading/Loading';
import { useReservationContext } from '../../context/reservationContext';
import styles from './ReservationPage.module.scss';

const getUserInfo = async () => {
  const { data } = (await axiosClient.get(`/user/me`)).data;
  return data;
};

export const ReservationPage = () => {
  const navigate = useNavigate();
  const { state: reservationState } = useReservationContext();
  const { offer } = reservationState;
  const [user, setUser] = useState(null);
  const totalPrice = offer.price * datesDifference(reservationState.checkIn, reservationState.checkOut);

  const [loading, setLoading] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeFailureModal = () => {
    setShowFailureModal(false);
  };

  const formObject = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const { register, handleSubmit, setValue } = formObject;

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [setUser, navigate]);

  useEffect(() => {
    if (!user) return;
    setValue('firstName', user.name);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
  }, [user, setValue]);

  const sendReservation = async (formData) => {
    const { data } = (
      await axiosClient.post(`/reservation`, {
        dateStart: reservationState.checkIn.toISOString().split('T')[0],
        dateEnd: reservationState.checkOut.toISOString().split('T')[0],
        object: offer._id,
        message: formData.message,
        payment: formData.paymentMethod,
        contact: {
          name: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        price: totalPrice,
      })
    ).data;
    return data;
  };

  const goToReservations = () => {
    navigate('/account/reservations', { replace: true });
  };

  const goToSearch = () => {
    navigate('/offers', { replace: true });
  };

  const onSubmit = (data) => {
    setLoading(true);
    sendReservation(data)
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch(() => {
        setShowFailureModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className={styles.contentContainer}>
          <h1 className={styles.header}>{offer.title}</h1>
          <section className={styles.orderSummary}>
            <img className={styles.orderSummaryPhoto} src={offer.image} alt="Zdj??cie zamawianego apartamentu" />
            <table className={styles.orderSummaryDataTable}>
              <tbody>
                <tr className={styles.orderSummaryDataTableRow}>
                  <th scope="row" className={styles.orderSummaryDataTableLabel}>
                    Zameldowanie
                  </th>
                  <td className={styles.orderSummaryDataTableItem}>{reservationState.checkIn.toDateString()}</td>
                </tr>
                <tr className={styles.orderSummaryDataTableRow}>
                  <th scope="row" className={styles.orderSummaryDataTableLabel}>
                    Wymeldowanie
                  </th>
                  <td className={styles.orderSummaryDataTableItem}>{reservationState.checkOut.toDateString()}</td>
                </tr>
                <tr className={styles.orderSummaryDataTableRow}>
                  <th scope="row" className={styles.orderSummaryDataTableLabel}>
                    Go??cie
                  </th>
                  <td className={styles.orderSummaryDataTableItem}>{reservationState.guests}</td>
                </tr>
                <tr className={styles.orderSummaryDataTableRow}>
                  <th scope="row" className={styles.orderSummaryDataTableLabel}>
                    Cena za noc
                  </th>
                  <td className={styles.orderSummaryDataTableItem}>{offer.price} PLN</td>
                </tr>
                <tr className={styles.orderSummaryDataTableRow}>
                  <th scope="row" className={styles.orderSummaryDataTableLabel}>
                    Razem
                  </th>
                  <td className={styles.orderSummaryDataTableItem}>{totalPrice} PLN</td>
                </tr>
              </tbody>
            </table>
          </section>
          <FormProvider {...formObject}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <SectionWithUnderlineTitle title="Dane kontaktowe">
                <div className={styles.inputContainer}>
                  <InputWithLabel
                    type="text"
                    label="Imi??"
                    name="firstName"
                    validation={{ required: 'Wpisz swoje imi??!' }}
                  />
                  <InputWithLabel
                    type="text"
                    label="Nazwisko"
                    name="lastName"
                    validation={{ required: 'Wpisz swoje nazwisko!' }}
                  />
                  <InputWithLabel
                    type="email"
                    label="Email"
                    name="email"
                    validation={{ required: 'Wpisz sw??j adres email!' }}
                  />
                  <InputWithLabel
                    type="tel"
                    label="Telefon"
                    name="phone"
                    validation={{ required: 'Wpisz sw??j numer telefonu!' }}
                  />
                </div>
              </SectionWithUnderlineTitle>
              <SectionWithUnderlineTitle title="Wiadomo????">
                <textarea className={styles.messageInput} {...register('message')} />
              </SectionWithUnderlineTitle>
              <SectionWithUnderlineTitle title="Szczeg????y p??atno??ci">
                <RadioButtons
                  name="paymentMethod"
                  values={[
                    { label: 'Got??wka', value: 'paying_on_place' },
                    { label: 'PayPal', value: 'paypal' },
                    { label: 'Karta kredytowa', value: 'credit-card' },
                  ]}
                  validation={{ required: 'Wybierz spos??b p??atno??ci' }}
                />
              </SectionWithUnderlineTitle>

              <button className={styles.submit} type="submit">
                Dokonaj rezerwacji
              </button>
            </form>
          </FormProvider>
        </main>
      )}

      <Modal
        confirmBtnTxt="Przejd?? do Moich Rezerwacji"
        confirmBtnHandler={goToReservations}
        isOpenModal={showSuccessModal}
        closeBtnTxt="Wr???? do wyszukiwania"
        closeBtnHandler={goToSearch}
      >
        Sukces! Twoja rezerwacja zosta??a przyj??ta
      </Modal>
      <Modal
        confirmBtnTxt="Wr???? do wyszukiwania"
        confirmBtnHandler={goToSearch}
        isOpenModal={showFailureModal}
        closeBtnTxt="Zamknij"
        closeBtnHandler={closeFailureModal}
      >
        Wyst??pi?? b????d z przetwarzaniem Twojej rezerwacji. Spr??buj ponownie
      </Modal>
    </>
  );
};
