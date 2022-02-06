import styles from './Button.module.scss';

export const ButtonLarge = ({ text, handleClick }) => {
  return (
    <button className={`${styles.buttonLarge} ${styles.button}`} onClick={handleClick}>
      {text}
    </button>
  );
};
