import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useAuth } from '../../context/authContext';
import styles from './LoginForm.module.scss';

export function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ mode: 'onChange' });
  const {
    state: { status, error },
  } = useAuth();
  return (
    <div className={styles.box}>
      <div className={styles.loginForm}>
        <div className={styles.loginText}>
          <h1>Logowanie</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Wpisz Email"
            {...register('email', { required: 'To pole jest wymagane.', pattern: /^\S+@\S+$/i })}
          />
          <p className={styles.p}>{errors.Email?.message}</p>
          <label className={styles.label}>Hasło</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Wpisz hasło"
            {...register('password', {
              required: 'To pole jest wymagane.',
              minLength: { value: 4, message: 'Minimum 4 znaki!' },
            })}
          />
          <p className={styles.p}>{errors.Password?.message}</p>

          <button disabled={!isDirty} className={styles.loginButton} type="submit">
            Zaloguj się
          </button>

          <div className={styles.passwordReminder}>
            <Link to="/remind-password" className={styles.link}>
              Przypomnij hasło
            </Link>
          </div>
        </form>
        {status === 'error' && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}
