import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from '../Hamburger/Hamburger.module.scss';

export const Hamburger = (props) => {
  return (
    <div className={styles.hamburger} aria-label={props.isOpen ? 'Zamknij menu' : 'Otwórz menu'}>
      {props.isOpen ? <AiOutlineClose className={styles.burger} /> : <AiOutlineMenu className={styles.burger} />}
    </div>
  );
};
