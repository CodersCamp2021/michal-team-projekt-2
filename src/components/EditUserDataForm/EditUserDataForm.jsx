import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { firstNameValidation, lastNameValidation, emailValidation } from '../../helpers/validators';
import styles from '../../styles/forms.module.scss';
import { userService } from '../../services/user';
import { dirtyValues } from '../../helpers/dirtyValues';

export function EditUserDataForm({ userData }) {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...userData,
    },
  });

  const fileChangedHandler = async (e) => {
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);
    await userService.updatePhoto(formData);
  };

  const onSubmit = async (data) => {
    const updatedFields = dirtyValues(dirtyFields, data);
    const res = await userService.updateMe(updatedFields);
    if (res) {
      setMessage(res.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelName}>Imię: </span>
          <input className={styles.input} type="text" {...register('name', { ...firstNameValidation })} />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </label>
        <label className={styles.label}>
          <span className={styles.labelName}>Nazwisko: </span>
          <input className={styles.input} type="text" {...register('lastName', { ...lastNameValidation })} />
          {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
        </label>
        <label className={styles.label}>
          <p className={styles.labelName}>Awatar:</p>
          <input className={styles.object} accept=".jpg, .jpeg, .png" type="file" onChange={fileChangedHandler} />
          {errors.photo && <ErrorMessage message={errors.photo.message} />}
        </label>
        <div className={styles.label}>
          <span className={styles.labelName}>Data urodzenia: </span>
          <p>{userData.dob}</p>
        </div>
        <label className={styles.label}>
          <span className={styles.labelName}>Języki: </span>
          <input className={styles.input} type="text" {...register('languages')} />
        </label>
        <label className={styles.label}>
          <span className={styles.labelName}>Email: </span>
          <input className={styles.input} type="email novalidation" {...register('email', { ...emailValidation })} />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </label>
        <div className={styles.buttonWrapper}>
          <ButtonForm name="Zapisz zmiany" disabled={!isValid || !isDirty} />
        </div>
        {message && <span className={styles.success}>{message}</span>}
      </form>
    </div>
  );
}
