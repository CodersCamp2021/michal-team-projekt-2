import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { AuthStatus } from '../../helpers/authStatus';
import { LinkButton } from '../LinkButton/LinkButton';
import { Logo } from '../Logo/Logo';
import { Hamburger } from '../Hamburger/Hamburger';
import { useAuth } from '../../context/authContext';
import { ButtonLarge } from '../Button/ButtonLarge';
import styles from './Header.module.scss';

export const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen);
  const {
    state: { status },
    logOut,
  } = useAuth();
  const { pathname } = useLocation();
  return (
    <header className={pathname === '/' ? `${styles.header} ${styles.headerImage}` : styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <nav
          role="navigation"
          className={hamburgerOpen ? `${styles.navigation} ${styles.navigationActive}` : styles.navigation}
        >
          <div className={styles.navigationContainer}>
            <div className={styles.navigationButtons}>
              {status !== AuthStatus.AUTHENTICATED ? (
                <>
                  <LinkButton path="/register" onClick={toggleHamburger}>
                    Zarejestruj się
                  </LinkButton>
                  <LinkButton path="/login" onClick={toggleHamburger}>
                    Zaloguj się
                  </LinkButton>
                </>
              ) : (
                <>
                  <ButtonLarge handleClick={() => logOut()} text="Wyloguj się" />
                  <LinkButton path="/account" onClick={toggleHamburger} ariaLabel="Moje konto">
                    <FaUserCircle size={20} />
                  </LinkButton>
                </>
              )}
            </div>
          </div>
        </nav>
        <Hamburger isOpen={hamburgerOpen} onClick={toggleHamburger} />
      </div>
    </header>
  );
};
