import { FC, PropsWithChildren } from 'react';
import Footer from '@/components/footer/Footer';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;