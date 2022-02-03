import { useState } from 'react';
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
  return (
    <header className={pathname === '/' ? `${styles.header} ${styles.headerImage}` : styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <nav className={`${styles.navigation} ${hamburgerOpen ? styles.navigationActive : ''}`}>
          <Locales />
          <div className={styles.navigationButtons}>
            {!isAuthenticated ? (
              <>
                <LinkButton path="/register" text="Zarejestruj się" />
                <LinkButton path="/login" text="Zaloguj się" />
              </>
            ) : (
              <Button handleClick={() => logOut()} text="Wyloguj się" />
            )}
          </div>
        </nav>
        <Hamburger isOpen={hamburgerOpen} onClick={toggleHamburger} />
      </div>
    </header>
  );
};
