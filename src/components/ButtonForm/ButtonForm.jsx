import styles from './ButtonForm.module.scss';

export function ButtonForm({ name, disabled }) {
  return (
    <button className={styles.button} type="submit" disabled={disabled}>
      {name}
    </button>
  );
}
