import {FC, PropsWithChildren} from 'react';

import Footer from '@/components/footer/Footer';
import {NavigationSection} from '@/models/site-block';

type LayoutProps = {
  sections: NavigationSection[];
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({sections, children}) => {
  return (
    <>
      {children}
      <Footer sections={sections} />
    </>
  );
};

export default Layout;
