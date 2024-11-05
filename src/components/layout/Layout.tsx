import {ActionIcon, Affix, Group, Transition} from '@mantine/core';
import {useInViewport, useWindowScroll} from '@mantine/hooks';
import {FC, PropsWithChildren} from 'react';

import {ContactMeButton} from '@/components/contact-me-button/ContactMeButton';
import {Footer} from '@/components/footer/Footer';
import IconUp from '@/icons/up.svg';
import {NavigationSection} from '@/models/site-block';

import classes from './Layout.module.css';

type LayoutProps = {
  sections: NavigationSection[];
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({sections, children}) => {
  const [scroll, scrollTo] = useWindowScroll();
  const {ref, inViewport} = useInViewport();

  return (
    <div className={classes.container}>
      {children}
      <Footer ref={ref} sections={sections} />

      <Affix position={{bottom: 'var(--app-padding-y)', right: 'var(--app-padding-x)'}}>
        <Transition transition="slide-up" mounted={scroll.y > 0 && !inViewport}>
          {transitionStyles => (
            <Group style={transitionStyles}>
              <ContactMeButton />
              <ActionIcon className={classes.iconButton} variant="main" onClick={() => scrollTo({y: 0})}>
                <IconUp />
              </ActionIcon>
            </Group>
          )}
        </Transition>
      </Affix>
    </div>
  );
};
