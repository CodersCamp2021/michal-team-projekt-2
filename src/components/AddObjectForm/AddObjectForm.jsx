import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styles from '../../styles/forms.module.scss';
import { useFetchPlaces } from '../../hooks/useFetchPlaces';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <p className={styles.labelName}>Nazwa obiektu:</p>
          <input
            type="text"
            placeholder="Nazwa obiektu"
            name="objectName"
            {...register('objectName', { ...objectNameValidation })}
            className={styles.input}
          />

          {errors.objectName && <ErrorMessage message={errors.objectName.message} />}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Lokalizacja:</p>
          <Controller
            control={control}
            name="localisation"
            rules={localisationValidation}
            render={({ field }) => (
              <input
                className={styles.input}
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
          {errors.localisation && <ErrorMessage message={errors.localisation.message} />}
        </label>

        <label className={styles.label}>
          <p className={styles.labelName}>Galeria zdjęć:</p>
          <input
            className={styles.object}
            {...register('picture', { ...pictureInputValidation })}
            type="file"
            name="picture"
            multiple
          />
          {errors.picture && <ErrorMessage message={errors.picture.message} />}
        </label>

        <label className={styles.label}>
          <p className={styles.labelName}>Udogodnienia: *</p>
          <textarea placeholder="np. wi-fi, basen itd." className={styles.input} />
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Opis obiektu:</p>
          <textarea
            placeholder="Opis obiektu"
            className={styles.input}
            {...register('objectDescription', { ...objectDescriptionValidation })}
          />
          {errors.objectDescription && <ErrorMessage message={errors.objectDescription.message} />}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Język:</p>
          <select
            className={styles.input}
            {...register('language', {
              languageValidation,
            })}
          >
            <option>PL</option>
            <option>DE</option>
          </select>
          {errors.language && <ErrorMessage message={errors.language.message} />}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Regulamin obiektu: *</p>
          <textarea placeholder="np. cisza nocna o 22:00 " className={styles.input} {...register('regulations')} />
        </label>
        <label className={styles.object}>
          <span className={styles.animalsName}>
            <input className={styles.checkboxNameAnimals} type="checkbox" {...register('animals')} />
            Możliwość zwierząt
          </span>
        </label>

        <label className={styles.label}>
          <p className={styles.labelName}>Akceptowalne formy płatności:</p>

          <span className={styles.checkboxName}>
            <input className={styles.objectCheckbox} type="checkbox" {...register('checkboxMoney')} />
            Gotówka
          </span>
          <span className={styles.checkboxName}>
            <input className={styles.objectCheckbox} type="checkbox" {...register('checkboxPayPal')} />
            PayPal
          </span>
          <span className={styles.checkboxName}>
            <input className={styles.objectCheckbox} type="checkbox" {...register('checkboxTransfer')} />
            Przelew
          </span>
        </label>

        <label className={styles.label}>
          <p className={styles.labelName}>FAQ: *</p>
          <textarea placeholder="Dodatkowe odpowiedzi na pytania" className={styles.input} {...register('fAQ')} />
        </label>
        <p className={styles.optional}>* - Możliwości opcjonalne</p>

        <ButtonForm type="submit" name="Dodaj obiekt" disabled={!isValid || !isDirty} />
      </form>
    </div>
  );
};
