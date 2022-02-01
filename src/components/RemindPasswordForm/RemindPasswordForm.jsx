import { useForm } from 'react-hook-form';
import { emailValidation } from '../../helpers/validators';
import styles from './RemindPassword.module.scss';

export function RemindPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.remindPasswordForm}>
        <div className={styles.remindPasswordText}> Przypomnij hasło</div>
        <div className={styles.inputDiv}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            {...register('Email', { ...emailValidation })}
          />
          <p className={styles.p}>{errors.Email?.message}</p>

          <div className={styles.sendBtnDiv}>
            <button type="submit" disabled={!isDirty} className={styles.sendBtn}>
              Wyślij
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
