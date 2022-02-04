import { useForm } from 'react-hook-form';
import styles from '../AddObjectForm/AddObjectForm.module.scss';
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
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Dodaj swój obiekt</p>
      <hr className={styles.line} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p className={styles.labelName}>Nazwa obiektu</p>
          <input
            type="text"
            placeholder="Nazwa obiektu"
            name="objectName"
            {...register('ObjectName', { ...objectNameValidation })}
            className={styles.object}
          />

          <span className={styles.validationError}>{errors.ObjectName?.message}</span>
        </label>
        <label>
          <p className={styles.labelName}>Lokalizacja</p>
          <select className={styles.object} {...register('Localisation', { ...localisationValidation })}>
            <option>PL</option>
            <option>DE</option>
          </select>

          <span className={styles.validationError}>{errors.Localisation?.message}</span>
        </label>

        <label>
          <p className={styles.labelName}>Galeria zdjęć</p>
          <input
            type="file"
            name="files"
            {...register('FileInput', { ...pictureInputValidation })}
            control={control}
            multiple
            className={styles.object}
          />

          <span className={styles.validationError}>{errors.FileInput?.message}</span>
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
            {...register('ObjectDescription', { ...objectDescriptionValidation })}
          />
          <span className={styles.validationError}>{errors.ObjectDescription?.message}</span>{' '}
        </label>
        <label>
          <p className={styles.labelName}>Język</p>
          <select
            className={styles.object}
            {...register('Language', {
              languageValidation,
            })}
          >
            <option>PL</option>
            <option>DE</option>
          </select>
          <span className={styles.validationError}>{errors.Language?.message}</span>{' '}
        </label>
        <label>
          <p className={styles.labelName}>Regulamin obiektu*</p>
          <textarea placeholder="np. cisza nocna o 22:00 " className={styles.object} {...register('Regulations')} />
        </label>
        <label className={styles.object}>
          <span className={styles.checkboxNameAnimals}>
            <input className={styles.checkbox} type="checkbox" {...register('Animals')} />
            Możliwość zwierząt
          </span>
        </label>
        <label className={styles.object}>
          <p className={styles.labelNamePayment}>Akceptowalne formy płatności:</p>
          <span className={styles.checkboxName}>
            <input className={styles.checkbox} type="checkbox" {...register('CheckboxMoney')} />
            Gotówka
          </span>
          <span className={styles.checkboxName}>
            <input className={styles.checkbox} type="checkbox" {...register('CheckboxPayPal')} />
            PayPal
          </span>
          <span className={styles.checkboxName}>
            <input className={styles.checkbox} type="checkbox" {...register('CheckboxTransfer')} />
            Przelew
          </span>
        </label>

        <label>
          <p className={styles.labelName}>FAQ*</p>
          <textarea placeholder="Dodatkowe odpowiedzi na pytania" className={styles.object} {...register('FAQ')} />
        </label>
        <p className={styles.optional}>* - Możliwości opcjonalne</p>

        <button type="submit" className={styles.objectBtn}>
          Dodaj obiekt
        </button>
      </form>
    </div>
  );
};
