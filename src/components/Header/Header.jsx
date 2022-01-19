import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import { Locales } from '../Locales/Locales';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <Logo />

        <nav>
          <Locales />
          <Button path="/register" description="Zarejestruj się" />
          <Button path="/login" description="Zaloguj się" />
        </nav>
      </div>
    </header>
  );
};
