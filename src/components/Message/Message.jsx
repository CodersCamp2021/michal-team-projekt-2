import styles from './Message.module.scss';

export const Message = ({ message, type = 'error' }) => {
  return <span className={`${styles.message}  ${type === 'error' ? styles.error : styles.success}`}>{message}</span>;
};
