import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export const LayoutWithHeaderAndFooter = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
