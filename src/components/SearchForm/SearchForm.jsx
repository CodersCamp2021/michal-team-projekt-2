import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';
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
        <label>
          Lokalizacja
          <input
            className={styles.input}
            name="localization"
            value={formState.localization}
            type="text"
            placeholder="Jaki jest cel Twojej podróży?"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className={`${styles.formGroup} ${styles.dataPicker} `}>
        <label>
          Zameldowanie
          <DatePicker
            wrapperClassName={styles.datePicker}
            name="checkIn"
            onChange={(d) => handleDateChange('checkIn', d)}
            minDate={new Date()}
            selected={formState.checkIn}
          />
        </label>
      </div>
      <div className={`${styles.formGroup} ${styles.dataPicker} `}>
        <label>
          Wymeldowanie
          <DatePicker
            wrapperClassName={styles.datePicker}
            name="checkOut"
            onChange={(d) => handleDateChange('checkOut', d)}
            minDate={formState.checkIn}
            selected={formState.checkOut}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Goście
          <input
            className={styles.input}
            name="guests"
            min={1}
            value={formState.guests}
            type="number"
            placeholder="Liczba gości"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" className={styles.searchBtn} aria-label="search" disabled={!formState.localization}>
        <BsSearch size={45} />
      </button>
    </form>
  );
};
