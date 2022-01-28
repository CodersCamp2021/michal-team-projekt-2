import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { localisationValidation, guestsValidation } from '../../helpers/validators';
import { useFetchPlaces } from '../../hooks/useFetchPlaces';
import styles from './SearchForm.module.scss';

export const SearchForm = ({ saveData }) => {
  const {
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      localisation: '',
      checkIn: new Date(),
      checkOut: new Date(),
      guests: 1,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const [suggestions] = useFetchPlaces(getValues('localisation'));
  return (
    <form data-testid="search-form" action="" className={styles.searchForm} onSubmit={handleSubmit(saveData)}>
      <div className={`${styles.formGroup} ${styles.localisation}`}>
        <label>
          Lokalizacja
          <Controller
            control={control}
            name="localisation"
            rules={localisationValidation}
            render={({ field }) => (
              <input
                className={styles.input}
                type="text"
                placeholder="Jaki jest cel Twojej podróży?"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                value={field.value}
                list="places"
                pattern={suggestions?.length > 0 ? suggestions.join('|') : ''}
              />
            )}
          />
          <datalist id="places">
            {suggestions?.length > 0 && suggestions.map((city) => <option key={city}>{city}</option>)}
          </datalist>
        </label>
        <span className={styles.validationError}>{errors?.localisation && errors?.localisation.message}</span>
      </div>
      <div className={`${styles.formGroup} ${styles.dataPicker} `}>
        <label>
          Zameldowanie
          <Controller
            control={control}
            name="checkIn"
            valueName="selected"
            rules={{
              validate: (value) => getValues('checkOut') >= value || 'Niepoprawna data zameldowania',
            }}
            render={({ field }) => (
              <DatePicker
                wrapperClassName={styles.datePicker}
                onChange={(d) => {
                  field.onChange(d);
                  trigger('checkOut');
                }}
                minDate={new Date()}
                selected={field.value}
              />
            )}
          />
        </label>
        <span className={styles.validationError}>{errors?.checkIn && errors?.checkIn.message}</span>
      </div>
      <div className={`${styles.formGroup} ${styles.dataPicker} `}>
        <label>
          Wymeldowanie
          <Controller
            control={control}
            name="checkOut"
            valueName="selected"
            rules={{
              validate: (value) => value >= getValues('checkIn') || 'Niepoprawna data wymeldowania',
            }}
            render={({ field }) => (
              <DatePicker
                wrapperClassName={styles.datePicker}
                onChange={(d) => {
                  field.onChange(d);
                  trigger('checkIn');
                }}
                minDate={getValues('checkIn')}
                selected={field.value}
              />
            )}
          />
        </label>
        <div className={styles.validationError}>{errors?.checkOut && errors?.checkOut.message}</div>
      </div>
      <div className={styles.formGroup}>
        <label>
          Goście
          <input
            className={styles.input}
            min={1}
            type="number"
            placeholder="Liczba gości"
            {...register('guests', { ...guestsValidation })}
          />
        </label>
        <span className={styles.validationError}>{errors?.guests && errors?.guests.message}</span>
      </div>
      <button type="submit" className={styles.searchBtn} aria-label="search" disabled={!isValid || !isDirty}>
        <BsSearch size={45} />
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  saveData: PropTypes.func.isRequired,
};
