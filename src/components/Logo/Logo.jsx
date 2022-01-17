import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} className={styles.logo} alt="logo" />
    </Link>
  );
};
