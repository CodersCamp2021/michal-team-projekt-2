import { useForm } from 'react-hook-form';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { passwordValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';

export function ResetPasswordForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Utwórz nowe hasło</p>
        <hr className={styles.line} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.label}>
            <span className={styles.labelName}>Hasło: </span>
            <input className={styles.input} type="password" {...register('password', { ...passwordValidation })} />
            {errors.password && <ErrorMessage message={errors.password.message} />}
          </label>
          <label className={styles.label}>
            <span className={styles.labelName}>Powtórz hasło: </span>
            <input
              className={styles.input}
              type="password"
              {...register('repassword', { validate: (value) => value === getValues('password') })}
            />
            {errors.repassword && <ErrorMessage message="Hasła muszą być identyczne" />}
          </label>
          <div className={styles.buttonWrapper}>
            <ButtonForm name="Zmień hasło" disabled={!isValid || !isDirty} />
          </div>
        </form>
      </div>
    </div>
  );
}
