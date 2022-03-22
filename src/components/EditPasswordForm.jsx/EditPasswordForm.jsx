import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { passwordValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';
import { userService } from '../../services/user';
import { dirtyValues } from '../../helpers/dirtyValues';

export function EditPasswordForm({ userData }) {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...userData,
    },
  });

  const onSubmit = async (data) => {
    const updatedFields = dirtyValues(dirtyFields, data);
    const updatedData = await userService.updateMe(updatedFields);
    if (updatedData) {
      setMessage('Your password has been successfully updated');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelName}>Stare hasło: </span>
          <input className={styles.input} type="password" {...register('password', { ...passwordValidation })} />
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </label>
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
            {...register('password', { validate: (value) => value === getValues('password') })}
          />
          {errors.password && <ErrorMessage message="Hasła muszą być identyczne" />}
        </label>
        <div className={styles.buttonWrapper}>
          <ButtonForm name="Zapisz zmiany" disabled={!isValid || !isDirty} />
        </div>
        {message && <span className={styles.success}>{message}</span>}
      </form>
    </div>
  );
}
