import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useAuth } from '../../context/authContext';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { emailValidation, passwordValidation } from '../../helpers/validators';
import styles from './LoginForm.module.scss';

export function LoginForm({ onSubmit }) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const {
    state: { status, error },
  } = useAuth();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Logowanie</p>
      <hr className={styles.line} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <span className={styles.labelName}>Email:</span>
          <input
            className={styles.input}
            type="email"
            placeholder="Wpisz Email"
            {...register('email', { ...emailValidation })}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Hasło:</span>
          <input
            className={styles.input}
            type="password"
            placeholder="Wpisz hasło"
            {...register('password', {
              ...passwordValidation,
            })}
          />
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </label>
        <ButtonForm name="Zarejestruj się" disabled={!isValid || !isDirty} />

        <div className={styles.passwordReminder}>
          <Link to="/remind-password" className={styles.link}>
            Przypomnij hasło
          </Link>
        </div>
      </form>
      {status === 'error' && <ErrorMessage message={error} />}
    </div>
  );
}
