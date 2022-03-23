import { useForm } from 'react-hook-form';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { Message } from '../Message/Message';
import {
  firstNameValidation,
  lastNameValidation,
  birthdayValidation,
  emailValidation,
  passwordValidation,
} from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';
import { AuthStatus } from '../../helpers/authStatus';
import { useAuth } from '../../context/authContext';

const checkBirthday = (birthday) => {
  const value = (Date.now() - Date.parse(birthday)) / 1000 / 60 / 60 / 24 / 365;
  return value >= 18;
};

export function RegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const {
    state: { status, error, message },
  } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Utwórz konto</p>
        <hr className={styles.line} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.label}>
            <span className={styles.labelName}>Imię: </span>
            <input className={styles.input} type="text" {...register('name', { ...firstNameValidation })} />
            {errors.name && <Message message={errors.name.message} />}
          </label>
          <label className={styles.label}>
            <span className={styles.labelName}>Nazwisko: </span>
            <input className={styles.input} type="text" {...register('lastName', { ...lastNameValidation })} />
            {errors.lastName && <Message message={errors.lastName.message} />}
          </label>
          <label className={styles.label}>
            <span className={styles.labelName}>Data urodzenia: </span>
            <input
              className={styles.input}
              type="date"
              {...register('dob', { ...birthdayValidation, validate: checkBirthday })}
            />
            {errors.dob && <Message message="Musisz mieć skończone 18 lat aby móc się zarejestrować" />}
          </label>
          <label className={styles.label}>
            <span className={styles.labelName}>Email: </span>
            <input className={styles.input} type="email novalidation" {...register('email', { ...emailValidation })} />
            {errors.email && <Message message={errors.email.message} />}
          </label>
          <label className={styles.label}>
            <span className={styles.labelName}>Hasło: </span>
            <input className={styles.input} type="password" {...register('password', { ...passwordValidation })} />
            {errors.password && <Message message={errors.password.message} />}
          </label>
          <label className={styles.label}>
            <span className={styles.labelName}>Powtórz hasło: </span>
            <input
              className={styles.input}
              type="password"
              {...register('repassword', { validate: (value) => value === getValues('password') })}
            />
            {errors.repassword && <Message message="Hasła muszą być identyczne" />}
          </label>
          <p className={styles.info}>
            Rejestrując się, akceptujesz <span className={styles.span}>Regulamin</span> i
            <span className={styles.span}> politikę prywatności</span>
          </p>
          <div className={styles.buttonWrapper}>
            <ButtonForm name="Zarejestruj się" disabled={!isValid || !isDirty} />
          </div>
        </form>
        {status === AuthStatus.ERROR && <Message message={error} />}
        {message && <span className={styles.success}>{message}</span>}
      </div>
    </div>
  );
}
