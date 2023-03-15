import styles from './Navigation.module.scss';

type NavigationProps = {
  items: {
    link: string;
    text: string;
  }[];
  className?: string;
};

export function Navigation(props: NavigationProps) {
  const { className } = props;

  const items = [
    {
      link: '#about-me',
      text: 'About me',
    },
    {
      link: '#weddings',
      text: 'Wedding',
    },
    {
      link: '#stories',
      text: 'Moments',
    },
    {
      link: '#unknown',
      text: 'Contact',
    },
  ];

  const navItems = items.map(item => (
    <a key={item.link} className={styles.navigation_item} href={item.link}>
      {item.text}
    </a>
  ));

  return (
    <nav className={[className, styles.navigation].join(' ')}>{navItems}</nav>
  );
}
