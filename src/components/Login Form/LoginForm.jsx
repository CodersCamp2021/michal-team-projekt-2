import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import styles from './LoginForm.module.scss';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => console.log(data);
  // console.log(errors);

  useEffect(() => {
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('password', JSON.stringify(password));
  }, [email, password]);

  return (
    <div className={styles.box}>
      <div className={styles.loginForm}>
        <div className={styles.loginText}>
          <h1>Logowanie</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label}>Email</label>
          <input
            value={email}
            className={styles.input}
            type="email"
            placeholder="Wpisz Email"
            {...register('Email', { required: 'To pole jest wymagane.', pattern: /^\S+@\S+$/i })}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.p}>{errors.Email?.message}</p>
          <label className={styles.label}>Hasło</label>
          <input
            value={password}
            className={styles.input}
            type="password"
            placeholder="Wpisz hasło"
            {...register('Password', {
              required: 'To pole jest wymagane.',
              minLength: { value: 4, message: 'Minimum 4 znaki!' },
            })}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={styles.p}>{errors.Password?.message}</p>
          {/* Styl buttonu pewnie do zmiany -> bodajże Kamil robi to się zgapi */}
          <button disabled={!isDirty} className={styles.loginButton} type="submit">
            Zaloguj się
          </button>
          {/* -(DO ZMIANY) funkcja przekierowująca do okna przypomnienia hasła po kliknięciu -> zrobię to /Mateusz*/}
          <div className={styles.passwordReminder}>
            <p>Przypomnij hasło</p>

            {/* Może przy przypomnij hasło, jeszcze przycisk w stylu "Nie masz konta? Zarejestruj się" i przekierowanie?*/}
          </div>
        </form>
      </div>
    </div>
  );
}
