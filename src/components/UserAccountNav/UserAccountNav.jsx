import { Link } from 'react-router-dom';
import styles from './UserAccountNav.module.scss';

export const UserAccountNav = () => {
  return (
    <div className={styles.nav}>
      <Link className={styles.navLink} to="/account/reservations">
        Rezerwacje
      </Link>
      <Link className={styles.navLink} to="/account/edit">
        Edytuj dane
      </Link>
      <Link className={styles.navLink} to="/account/password">
        Zmień hasło
      </Link>
    </div>
  );
};
