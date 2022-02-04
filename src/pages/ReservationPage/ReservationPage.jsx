import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SectionWithUnderlineTitle } from '../../components/SectionWithUnderlineTitle/SectionWithUnderlineTitle';
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel';
import { RadioButtons } from '../../components/RadioButtons/RadioButtons';
import styles from './ReservationPage.module.scss';

export const ReservationPage = () => {
  const formObject = useForm({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = formObject;

  const onSubmit = (data) => console.log(data);

  return (
    <main className={styles.contentContainer}>
      <h1 className={styles.header}>Apartament z widokiem na morze</h1>
      <section className={styles.orderSummary}>
        <img
          className={styles.orderSummaryPhoto}
          src="https://media-cdn.tripadvisor.com/media/photo-s/12/50/d8/08/capital-apartments-poznan.jpg"
          alt="Zdjęcie zamawianego apartamentu"
        />
        <table className={styles.orderSummaryDataTable}>
          <tbody>
            <tr className={styles.orderSummaryDataTableRow}>
              <th scope="row" className={styles.orderSummaryDataTableLabel}>Zameldowanie</td>
              <td className={styles.orderSummaryDataTableItem}>11.12.2022</td>
            </tr>
            <tr className={styles.orderSummaryDataTableRow}>
              <th scope="row" className={styles.orderSummaryDataTableLabel}>Wymeldowanie</td>
              <td className={styles.orderSummaryDataTableItem}>15.12.2022</td>
            </tr>
            <tr className={styles.orderSummaryDataTableRow}>
              <th scope="row" className={styles.orderSummaryDataTableLabel}>Goście</td>
              <td className={styles.orderSummaryDataTableItem}>2 dorosłych, 1 dziecko</td>
            </tr>
            <tr className={styles.orderSummaryDataTableRow}>
              <th scope="row" className={styles.orderSummaryDataTableLabel}>Cena za noc</td>
              <td className={styles.orderSummaryDataTableItem}>169 zł</td>
            </tr>
            <tr className={styles.orderSummaryDataTableRow}>
              <th scope="row" className={styles.orderSummaryDataTableLabel}>Razem</td>
              <td className={styles.orderSummaryDataTableItem}>687 zł</td>
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
                label="Imię"
                name="firstName"
                validation={{ required: 'Wpisz swoje imię!' }}
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
                validation={{ required: 'Wpisz swój adres email!' }}
              />
              <InputWithLabel
                type="tel"
                label="Telefon"
                name="phone"
                validation={{ required: 'Wpisz swój numer telefonu!' }}
              />
            </div>
          </SectionWithUnderlineTitle>
          <SectionWithUnderlineTitle title="Wiadomość">
            <textarea className={styles.messageInput} {...register('message')} />
          </SectionWithUnderlineTitle>
          <SectionWithUnderlineTitle title="Szczegóły płatności">
            <RadioButtons
              name="paymentMethod"
              values={[
                { label: 'Przelewy 24', value: 'p24' },
                { label: 'PayPal', value: 'paypal' },
                { label: 'Karta kredytowa', value: 'credit' },
              ]}
              validation={{ required: 'Wybierz sposób płatności' }}
            />
          </SectionWithUnderlineTitle>

          <button disabled={!isValid || !isDirty} className={styles.submit} type="submit">
            Dokonaj rezerwacji
          </button>
        </form>
      </FormProvider>
    </main>
  );
};
