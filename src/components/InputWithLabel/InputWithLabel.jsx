import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './InputWithLabel.module.scss';

export const InputWithLabel = ({ label, name, validation, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.inputLabel}>
        {label}
        <input
          className={styles.input}
          aria-invalid={errors[name] ? true : false}
          {...register(name, validation)}
          {...props}
        ></input>
      </label>
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );
};
