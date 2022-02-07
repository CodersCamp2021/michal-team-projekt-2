import { Link } from 'react-router-dom';
import styles from '../Button/Button.module.scss';

export const LinkButton = ({ children, path, onClick, upper }) => {
  return (
    <Link to={path} className={`${upper && styles.buttonUpper} ${styles.button}`} onClick={onClick}>
      {children}
    </Link>
  );
};
