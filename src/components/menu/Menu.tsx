import { FC, forwardRef, useEffect, useState } from 'react';
import { Root, Trigger, Content, Item, Portal } from '@radix-ui/react-dropdown-menu';
import styles from './Menu.module.scss';
import CloseIcon from '@/icons/close-2.svg';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LinkComponent = forwardRef<HTMLAnchorElement, { text: string, path: string, className?: string }>(({
                                                                                                           text,
                                                                                                           path,
                                                                                                           className,
                                                                                                         }, ref) => (
  <Link ref={ref} href={path} className={className}>
    {text}
  </Link>
));

const MotionLinkComponent = motion.create(LinkComponent);


export const Menu: FC<{ className?: string, itemsClassName?: string }> = ({ className, itemsClassName }) => {
  const [opened, setOpened] = useState(false);

  const items = [
    {
      text: 'Weddings',
      path: '#weddings',
    },
    {
      text: 'Love stories',
      path: '#love-story',
    },
    {
      text: 'Santorini',
      path: '#santorini',
    },
    {
      text: 'Other Works',
      path: '#other-works',
    },
    {
      text: 'About me',
      path: '/about',
    },
    {
      text: 'Contact',
      path: '/contact',
    },
  ];

  const links = items.map(({ text, path }) => (
    <Item key={text} asChild>
      <MotionLinkComponent
        className={clsx(styles.menuLink, itemsClassName)}
        path={path}
        text={text}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}></MotionLinkComponent>
    </Item>));

  return <Root modal={false}>
    <Trigger className={styles.trigger} asChild>
      <div className={styles.buttonContainer}>
        <motion.button className={clsx(styles.menuButton, className)}
                       whileHover={{ scale: 1.2 }}
                       whileTap={{ scale: 0.9 }}>
          <span>Menu</span>
          <CloseIcon />
        </motion.button>
      </div>
    </Trigger>
    <Portal>
      <Content className={styles.menuContent} align={'end'}>
        {links}
        <Item className={clsx(styles.menuLink, itemsClassName)}>EN | LT {'' + opened}</Item>
      </Content>
    </Portal>
  </Root>;
};