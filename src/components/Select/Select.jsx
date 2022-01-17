import styles from './Select.module.scss';

export const Select = (props) => {
  return (
    <select className={styles.select}>
      {props.options.map((option, i) => {
        return <option key={i}>{option}</option>;
      })}
    </select>
  );
};
