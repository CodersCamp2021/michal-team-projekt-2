import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './SearchForm.module.scss';

export const SearchForm = () => {
  const [formState, setFormState] = useState({
    localization: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  return (
    <form action="" className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={`${styles.formGroup} ${styles.localization}`}>
        <label htmlFor="localization">Lokalizacja</label>
        <input
          className={styles.input}
          name="localization"
          id="localization"
          type="text"
          placeholder="Jaki jest cel Twojej podróży?"
          onChange={handleChange}
          required
        />
      </div>
      <div className={`${styles.formGroup} ${styles.dataPicker} `}>
        <label htmlFor="localization">Zameldowanie</label>
        <DatePicker
          wrapperClassName={styles.datePicker}
          name="checkIn"
          onChange={(d) => handleDateChange('checkIn', d)}
          selected={formState.checkIn}
          required
        />
      </div>
      <div className={`${styles.formGroup} ${styles.dataPicker} `}>
        <label htmlFor="checkIn">Wymeldowanie</label>
        <DatePicker
          wrapperClassName={styles.datePicker}
          name="checkOut"
          onChange={(d) => handleDateChange('checkOut', d)}
          selected={formState.checkOut}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="guests">Goście</label>
        <input
          className={styles.input}
          name="guests"
          id="guests"
          type="number"
          placeholder="Liczba gości"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.searchBtn}>
        <BsSearch size={45} />
      </button>
    </form>
  );
};
