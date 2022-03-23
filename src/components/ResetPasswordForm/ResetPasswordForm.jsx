import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { Message } from '../Message/Message';
import { passwordValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';
import { axiosClient } from '../../helpers/axiosClient';

export function ResetPasswordForm() {
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm({
    mode: 'onChange',
  });
  const location = useLocation().search;

  const sendPutRequest = async (data) => {
    const token = new URLSearchParams(location).get('resetId');
    const dataObj = { ...data, resetToken: token };
    try {
      const resp = await axiosClient.patch('user/resetPassword', dataObj);
      if (resp.status === 200) {
        setStatus(resp.status);
        setMessage(resp.data.message);
      }
    } catch (err) {
      setStatus(err.response.status);
      setMessage(err.response.data.message);
    }
  };

  const onSubmit = async (data) => sendPutRequest(data);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Utwórz nowe hasło</p>
        <hr className={styles.line} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <ButtonForm name="Zmień hasło" disabled={!isValid || !isDirty} />
            {message && status === 200 ? (
              <Message message={message} type="success" />
            ) : (
              <Message message={message} type="error" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
