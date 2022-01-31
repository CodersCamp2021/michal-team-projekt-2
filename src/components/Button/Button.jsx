import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

export const Button = ({ description, path, handleClick }) => {
  return (
    <Link to={path}>
      <button className={styles.button} onClick={handleClick}>
        {description}
      </button>
    </Link>
  );
};
