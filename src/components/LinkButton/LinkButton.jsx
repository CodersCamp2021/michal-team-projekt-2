import { Link } from 'react-router-dom';
import styles from '../Button/Button.module.scss';

export const LinkButton = ({ text, path, onClick }) => {
  return (
    <Link to={path} className={styles.button} onClick={onClick}>
      {text}
    </Link>
  );
};
