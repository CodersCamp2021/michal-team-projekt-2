import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styles from '../AddObjectForm/AddObjectForm.module.scss';
import { useFetchPlaces } from '../../hooks/useFetchPlaces';
import {
  localisationValidation,
  objectNameValidation,
  pictureInputValidation,
  objectDescriptionValidation,
  languageValidation,
} from '../../helpers/validators';

export const AddObjectForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      objectName: '',
      localisation: '',
      objectDescription: '',
      language: '',
      regulations: '',
      animals: false,
      checkboxMoney: false,
      checkboxPayPal: false,
      checkboxTransfer: false,
      fAQ: '',
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const [suggestions] = useFetchPlaces(watch('localisation'));

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.picture[0]);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Dodaj swój obiekt</p>
      <hr className={styles.line} />

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p className={styles.labelName}>Nazwa obiektu</p>
          <input
            type="text"
            placeholder="Nazwa obiektu"
            name="objectName"
            {...register('objectName', { ...objectNameValidation })}
            className={styles.object}
          />

          <span className={styles.validationError}>{errors.objectName?.message}</span>
        </label>
        <label>
          <p className={styles.labelName}>Lokalizacja</p>
          <Controller
            control={control}
            name="localisation"
            rules={localisationValidation}
            render={({ field }) => (
              <input
                className={styles.object}
                type="text"
                placeholder="Lokalizacja obiektu"
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
          <span className={styles.validationError}>{errors.localisation?.message}</span>
        </label>

        <label>
          <p className={styles.labelName}>Galeria zdjęć</p>
          <input
            className={styles.object}
            {...register('picture', { ...pictureInputValidation })}
            type="file"
            name="picture"
            multiple
          />
        </label>

        <label>
          <p className={styles.labelName}>Udogodnienia*</p>
          <textarea placeholder="np. wi-fi, basen itd." className={styles.object} />
        </label>
        <label>
          <p className={styles.labelName}>Opis obiektu</p>
          <textarea
            placeholder="Opis obiektu"
            className={styles.object}
            {...register('objectDescription', { ...objectDescriptionValidation })}
          />
          <span className={styles.validationError}>{errors.objectDescription?.message}</span>{' '}
        </label>
        <label>
          <p className={styles.labelName}>Język</p>
          <select
            className={styles.object}
            {...register('language', {
              languageValidation,
            })}
          >
            <option>PL</option>
            <option>DE</option>
          </select>
          <span className={styles.validationError}>{errors.language?.message}</span>{' '}
        </label>
        <label>
          <p className={styles.labelName}>Regulamin obiektu*</p>
          <textarea placeholder="np. cisza nocna o 22:00 " className={styles.object} {...register('regulations')} />
        </label>
        <label className={styles.object}>
          <span className={styles.checkboxNameAnimals}>
            <input className={styles.checkbox} type="checkbox" {...register('animals')} />
            Możliwość zwierząt
          </span>
        </label>

        <label className={styles.object}>
          <p className={styles.labelNamePayment}>Akceptowalne formy płatności:</p>

          <span className={styles.checkboxName}>
            <input className={styles.checkbox} type="checkbox" {...register('checkboxMoney')} />
            Gotówka
          </span>
          <span className={styles.checkboxName}>
            <input className={styles.checkbox} type="checkbox" {...register('checkboxPayPal')} />
            PayPal
          </span>
          <span className={styles.checkboxName}>
            <input className={styles.checkbox} type="checkbox" {...register('checkboxTransfer')} />
            Przelew
          </span>
        </label>

        <label>
          <p className={styles.labelName}>FAQ*</p>
          <textarea placeholder="Dodatkowe odpowiedzi na pytania" className={styles.object} {...register('fAQ')} />
        </label>
        <p className={styles.optional}>* - Możliwości opcjonalne</p>

        <button type="submit" className={styles.objectBtn} disabled={!isValid || !isDirty}>
          Dodaj obiekt
        </button>
      </form>
    </div>
  );
};
