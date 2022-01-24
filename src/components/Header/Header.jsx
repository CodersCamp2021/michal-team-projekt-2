import { useState } from 'react';
import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Locales } from '../Locales/Locales';
import { Hamburger } from '../Hamburger/Hamburger';

import styles from './Header.module.scss';

export const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen);

  return (
    <header>
      <div className={styles.header}>
        <Logo />
        <nav className={`${styles.navigation} ${hamburgerOpen ? styles.navigationActive : ''}`}>
          <Locales />
          <div className={styles.navigationButtons}>
            <Button path="/register" description="Zarejestruj się" />
            <Button path="/login" description="Zaloguj się" />
          </div>
        </nav>
        <div className={styles.hamburgerWrapper} onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen} />
        </div>
      </div>
    </header>
  );
};
