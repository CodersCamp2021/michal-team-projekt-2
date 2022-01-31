import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './InputWithLabel.module.scss';

export const InputWithLabel = ({ label, name, validation, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.inputLabel}>{label}</label>
      <input className={styles.input} {...register(name, validation)} {...props}></input>
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
};
