import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ message }) => {
  return <span className={styles.error}>{message}</span>;
};
