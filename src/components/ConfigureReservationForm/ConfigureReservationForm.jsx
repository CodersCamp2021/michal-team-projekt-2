import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { datesDifference } from '../../helpers/datesDifference';
import { bedsValidation, guestsValidation } from '../../helpers/validators';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './ConfigureReservationForm.module.scss';

export const ConfigureReservationForm = ({ price }) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: new Date(),
      checkOut: new Date(),
      guests: 1,
    },
  });
  const numOfDays = datesDifference(watch('checkIn'), watch('checkOut')) || 1;
  const totalPrice = numOfDays * price;

  const onSubmit = (data) => console.log(data);

  return (
    <form className={styles.reservationForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.reservationFormGroup}>
        <label>
          <span>Zameldowanie</span>
          <Controller
            control={control}
            name="checkIn"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                onChange={(date) => {
                  onChange(date);
                  trigger('checkOut');
                  datesDifference(getValues('checkIn'), getValues('checkOut')) < 1 &&
                    setValue('checkOut', getValues('checkIn'));
                }}
                minDate={new Date()}
                selected={value}
                selectsStart
                startDate={getValues('checkIn')}
                endDate={getValues('checkOut')}
              />
            )}
          />
        </label>
      </div>
      <div className={styles.reservationFormGroup}>
        <label>
          <span>Wymeldowanie</span>
          <Controller
            control={control}
            name="checkOut"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                onChange={(date) => {
                  onChange(date);
                  trigger('checkIn');
                }}
                minDate={getValues('checkIn')}
                selected={value}
                selectsEnd
                startDate={getValues('checkIn')}
                endDate={getValues('checkOut')}
              />
            )}
          />
        </label>
      </div>
      <div className={`${styles.reservationFormGroup} ${styles.reservationFormGuests}`}>
        <label>
          <span>Goście</span>
          <input type="number" min={1} defaultValue={1} {...register('guests', { ...guestsValidation })} />
        </label>
        {errors.guests && <ErrorMessage message={errors.guests.message} />}
      </div>
      <div className={`${styles.reservationFormGroup} ${styles.reservationFormBed}`}>
        <label>
          <span>Konfiguracja łóżek</span>
          <select name="beds" id="beds" {...register('beds', { ...bedsValidation })}>
            <option value="">Wybierz swoją konfigurację</option>
            <option value="two-single-bed">2 łóżka jednoosobowe</option>
            <option value="one-double-bed">1 łóżko dwuosobowe</option>
            <option value="one-king-size-bed">1 łóżko typu king size</option>
          </select>
        </label>
        {errors.beds && <ErrorMessage message={errors.beds.message} />}
      </div>
      <p data-testid="priceByNight" className={styles.reservationFormPrice}>
        <span>{price}</span> zł/noc
      </p>
      <p data-testid="totalPrice" className={styles.reservationFormTotalPrice}>
        <span>
          Razem ({numOfDays} {numOfDays === 1 ? `noc` : `noce`})
        </span>
        <span>{totalPrice} zł</span>
      </p>
      <button className={styles.reservationButton} type="submit">
        Rezerwuj
      </button>
    </form>
  );
};
