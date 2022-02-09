import { Header } from '../components/Header/Header';

export const LayoutWithHeaderAndWithoutFooter = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
