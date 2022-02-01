import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../Button/Button.module.scss';

export const LinkButton = ({ text, path }) => {
  return (
    <Link to={path} className={styles.button}>
      {text}
    </Link>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
