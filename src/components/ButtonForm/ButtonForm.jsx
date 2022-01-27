import React from 'react';
import styles from './ButtonForm.module.scss';

export function ButtonForm({ name, disabled }) {
  return (
    <button className={styles.button} disabled={disabled}>
      {name}
    </button>
  );
}
