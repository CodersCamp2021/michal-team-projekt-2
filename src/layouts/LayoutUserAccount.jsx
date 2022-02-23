import { UserAccountNav } from '../components/UserAccountNav/UserAccountNav';
import styles from './Layout.module.scss';

export const LayoutUserAccount = ({ children }) => {
  return (
    <div className={styles.user}>
      <div className={styles.userWrapper}>
        <UserAccountNav />
        <div>{children}</div>
      </div>
    </div>
  );
};
