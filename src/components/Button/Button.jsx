import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export const Button = ({ text, handleClick }) => {
  return (
    <Button className={styles.button} onClick={handleClick}>
      {text}
    </Button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
