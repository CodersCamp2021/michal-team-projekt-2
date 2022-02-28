import { useForm } from 'react-hook-form';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { firstNameValidation, lastNameValidation, emailValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';

export function EditUserDataForm({ onSubmit, userData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...userData,
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelName}>Imię: </span>
          <input className={styles.input} type="text" {...register('firstName', { ...firstNameValidation })} />
          {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
        </label>
        <label className={styles.label}>
          <span className={styles.labelName}>Nazwisko: </span>
          <input className={styles.input} type="text" {...register('lastName', { ...lastNameValidation })} />
          {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Awatar:</p>
          <input className={styles.object} {...register('picture')} type="file" name="picture" />
          {errors.picture && <ErrorMessage message={errors.picture.message} />}
        </label>
        <div className={styles.label}>
          <span className={styles.labelName}>Data urodzenia: </span>
          <p>{userData.dob}</p>
        </div>
        <label className={styles.label}>
          <span className={styles.labelName}>Języki: </span>
          <input className={styles.input} type="text" {...register('languages')} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelName}>Email: </span>
          <input className={styles.input} type="email novalidation" {...register('email', { ...emailValidation })} />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </label>
        <div className={styles.buttonWrapper}>
          <ButtonForm name="Zapisz zmiany" disabled={!isValid || !isDirty} />
        </div>
      </form>
    </div>
  );
}
