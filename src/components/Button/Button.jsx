import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

export const Button = ({ description, path }) => {
  return (
    <Link className={styles.button} to={path}>
      {description}
    </Link>
  );
};
