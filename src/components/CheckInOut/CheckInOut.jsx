import { dateConverter } from '../../helpers/dateConverter';
import styles from './CheckInOut.module.scss';

export const CheckInOut = ({ title, date, hours }) => {
  return (
    <div className={styles.checkInOut}>
      <h3 className={styles.checkInOutTitle}>{title}</h3>
      <p className={styles.checkInOutDate}>{dateConverter(date, 'day')}</p>
      <p className={styles.checkInOutMonth}>{dateConverter(date, 'month')}</p>
      <p className={styles.checkInOutOther}>{dateConverter(date, 'weekday')}</p>
      <p className={styles.checkInOutOther}>{hours}</p>
    </div>
  );
};
