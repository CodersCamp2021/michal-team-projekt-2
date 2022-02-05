import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { authenticated } from '../../helpers/authStatus';
import { LinkButton } from '../LinkButton/LinkButton';
import { Logo } from '../Logo/Logo';
import { Locales } from '../Locales/Locales';
import { Hamburger } from '../Hamburger/Hamburger';
import { useAuth } from '../../context/authContext';
import { Button } from '../Button/Button';
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
            <Locales />
            <div className={styles.navigationButtons}>
              {status !== authenticated ? (
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
                  <Button handleClick={() => logOut()} text="Wyloguj się" />
                  <LinkButton path="/account" onClick={toggleHamburger}>
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
