import styles from './Button.module.scss';

export const Button = ({ text, handleClick }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
};
