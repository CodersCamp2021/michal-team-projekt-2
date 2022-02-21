import { Link } from 'react-router-dom';
import styles from '../Button/Button.module.scss';

export const LinkButton = ({ children, path, onClick, upper, ariaLabel }) => {
  return (
    <Link
      to={path}
      className={`${upper ? styles.buttonUpper : ''} ${styles.button}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};
