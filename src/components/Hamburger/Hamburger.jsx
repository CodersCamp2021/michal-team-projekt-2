import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from '../Hamburger/Hamburger.module.scss';

export const Hamburger = ({ isOpen, onClick }) => {
  return (
    <div
      className={isOpen ? `${styles.hamburger} ${styles.hamburgerActive}` : styles.hamburger}
      aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
      onClick={onClick}
    >
      {isOpen ? <AiOutlineClose className={styles.burger} /> : <AiOutlineMenu className={styles.burger} />}
    </div>
  );
};
