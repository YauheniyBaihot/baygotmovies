import {FC, PropsWithChildren} from 'react';

import {Footer} from '@/components/footer/Footer';
import {NavigationSection} from '@/models/site-block';

import classes from './Layout.module.css';

type LayoutProps = {
  sections: NavigationSection[];
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({sections, children}) => {
  return (
    <div className={classes.container}>
      {children}
      <Footer sections={sections} />
    </div>
  );
};
