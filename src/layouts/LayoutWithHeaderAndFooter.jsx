import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import styles from './Layout.module.scss';

export const LayoutWithHeaderAndFooter = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
