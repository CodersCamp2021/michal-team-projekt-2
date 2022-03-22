import { useFormContext } from 'react-hook-form';
import { Message } from '../Message/Message';
import styles from './RadioButtons.module.scss';

export const RadioButtons = ({ name, values, validation, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.inputWrapper}>
      {values.map((el) => (
        <label key={el.value} className={styles.inputLabel}>
          <input type="radio" value={el.value} className={styles.input} {...register(name, validation)} {...props} />
          {el.label}
        </label>
      ))}

      {errors[name] && <Message message={errors[name].message} />}
    </div>
  );
};
