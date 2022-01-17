import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

export const Button = (props) => {
  return (
    <Link className={styles.button} to={props.path}>
      {props.description}
    </Link>
  );
};
