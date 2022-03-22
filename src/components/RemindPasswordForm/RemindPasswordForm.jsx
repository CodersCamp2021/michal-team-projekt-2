import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { emailValidation } from '../../helpers/validators';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { Message } from '../Message/Message';
import styles from '../../styles/forms.module.scss';
import { axiosClient } from '../../helpers/axiosClient';

export function RemindPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isValid },
  } = useForm({ mode: 'onChange' });
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();

  const sendPutRequest = async (data) => {
    try {
      const resp = await axiosClient.patch('user/forgotPassword', data);
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
            {errors.email && <Message message={errors.email.message} />}
          </label>
          <div className={styles.buttonWrapper}>
            <ButtonForm type="submit" name="Wyślij" disabled={!isValid || !isDirty} />
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
