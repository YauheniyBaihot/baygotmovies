import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
};

export function Button(props: ButtonProps) {
  const { text } = props;

  return <button className={styles.button}>{text}</button>;
}
