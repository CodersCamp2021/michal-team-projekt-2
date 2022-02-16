import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { emailValidation } from '../../helpers/validators';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from '../../styles/forms.module.scss';

export function RemindPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isValid },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Przypomnij hasło</p>
        <hr className={styles.line} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          <div className={styles.buttonWrapper}>
            <ButtonForm type="submit" name="Wyślij" disabled={!isValid || !isDirty} />
          </div>
        </form>
      </div>
    </div>
  );
}
