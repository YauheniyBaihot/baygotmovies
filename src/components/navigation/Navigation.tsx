import styles from "./Navigation.module.scss";

type NavigationProps = {
  items: {
    link: string;
    text: string;
  }[];
};

export function Navigation(props: NavigationProps) {
  const { items } = props;

  const navItems = items.map(item => (
    <a key={item.link} className={styles.navigationItem} href={item.link}>
      {item.text}
    </a>
  ));

  return (
    <nav className={styles.navigation}>{navItems}</nav>
  );
}
