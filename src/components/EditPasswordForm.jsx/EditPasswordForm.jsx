import { useForm } from 'react-hook-form';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { Message } from '../Message/Message';
import { passwordValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';

export function EditPasswordForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelName}>Stare hasło: </span>
          <input className={styles.input} type="password" {...register('oldPassword', { ...passwordValidation })} />
          {errors.oldPassword && <Message message={errors.oldPassword.message} />}
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
        <div className={styles.buttonWrapper}>
          <ButtonForm name="Zapisz zmiany" disabled={!isValid || !isDirty} />
        </div>
      </form>
    </div>
  );
}
