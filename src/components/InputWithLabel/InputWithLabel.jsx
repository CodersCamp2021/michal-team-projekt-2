import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiAlertTriangle } from 'react-icons/fi';
import styles from './InputWithLabel.module.scss';

export const InputWithLabel = ({ label, name, validation, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.input}
        aria-invalid={errors[name] ? true : false}
        {...register(name, validation)}
        {...props}
      ></input>
      {errors[name] && (
        <p className={styles.error}>
          <FiAlertTriangle />
          &nbsp;
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
