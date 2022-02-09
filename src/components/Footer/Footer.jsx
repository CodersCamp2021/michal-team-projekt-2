import logo from '../../images/logo.svg';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <img src={logo} className={styles.footerLogo} alt="logo" />
      <p className={styles.footerText}>Prawa autorskie &copy; 2022 Bking. Wszelkie prawa zastrzeżone.</p>
    </div>
  );
};
