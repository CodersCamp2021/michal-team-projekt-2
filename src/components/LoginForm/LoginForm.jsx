import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Message } from '../Message/Message';
import { useAuth } from '../../context/authContext';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { emailValidation, passwordValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';
import { AuthStatus } from '../../helpers/authStatus';

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
      <div className={styles.formContainer}>
        <p className={styles.title}>Logowanie</p>
        <hr className={styles.line} />
        <form data-testid="login-form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label}>
            Email:
            <input
              className={styles.input}
              type="email"
              placeholder="Wpisz Email"
              {...register('email', { ...emailValidation })}
            />
            {errors.email && <Message message={errors.email.message} />}
          </label>

          <label className={styles.label}>
            Hasło:
            <input
              className={styles.input}
              type="password"
              placeholder="Wpisz hasło"
              {...register('password', {
                ...passwordValidation,
              })}
            />
            {errors.password && <Message message={errors.password.message} />}
          </label>
          <div className={styles.buttonWrapper}>
            <ButtonForm name="Zaloguj się" disabled={!isValid || !isDirty} />
          </div>
          <div className={styles.passwordReminder}>
            <Link to="/remind-password" className={styles.link}>
              Przypomnij hasło
            </Link>
          </div>
        </form>
        {status === AuthStatus.ERROR && <Message message={error} />}
      </div>
    </div>
  );
}
