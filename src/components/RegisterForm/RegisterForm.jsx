import { useForm } from 'react-hook-form';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import {
  firstNameValidation,
  surNameValidation,
  birthdayValidation,
  emailValidation,
  passwordValidation,
} from '../../helpers/validators';
import styles from './RegisterForm.module.scss';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const handleOnSubmit = (data) => {
    console.log(data);
    reset();
  };

  const checkBirthday = (birthday) => {
    const value = (Date.now() - Date.parse(birthday)) / 1000 / 60 / 60 / 24 / 365;
    if (value < 18) {
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Utwórz konto</p>
      <hr className={styles.line} />
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
        <label className={styles.label}>
          <p className={styles.labelName}>Imię: </p>
          <input className={styles.input} type="text" {...register('firstName', { ...firstNameValidation })} />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Nazwisko: </p>
          <input className={styles.input} type="text" {...register('surName', { ...surNameValidation })} />
          {errors.surName && <p className={styles.error}>{errors.surName.message}</p>}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Data urodzenia: </p>
          <input
            className={styles.input}
            type="date"
            {...register('birthday', { ...birthdayValidation, validate: checkBirthday })}
          />
          {errors.birthday && <p className={styles.error}>Musisz mieć skończone 18 lat aby móc się zarejestrować</p>}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Email: </p>
          <input className={styles.input} type="email novalidation" {...register('email', { ...emailValidation })} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Hasło: </p>
          <input className={styles.input} type="password" {...register('password', { ...passwordValidation })} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Powtórz hasło: </p>
          <input
            className={styles.input}
            type="password"
            {...register('repassword', { validate: (value) => value === getValues('password') })}
          />
          {errors.repassword && <p className={styles.error}>Hasła muszą być identyczne</p>}
        </label>
        <p className={styles.info}>
          Rejestrując się, akceptujesz <span className={styles.span}>Regulamin</span> i
          <span className={styles.span}> politikę prywatności</span>
        </p>
        <ButtonForm name="Zarejestruj się" disabled={!isValid || !isDirty} />
      </form>
    </div>
  );
}
