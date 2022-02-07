import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const isAuthenticated = status === 'authenticated';
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
              {!isAuthenticated ? (
                <>
                  <LinkButton path="/register" text="Zarejestruj się" onClick={toggleHamburger} />
                  <LinkButton path="/login" text="Zaloguj się" onClick={toggleHamburger} />
                </>
              ) : (
                <Button handleClick={() => logOut()} text="Wyloguj się" />
              )}
            </div>
          </div>
        </nav>
        <Hamburger isOpen={hamburgerOpen} onClick={toggleHamburger} />
      </div>
    </header>
  );
};
