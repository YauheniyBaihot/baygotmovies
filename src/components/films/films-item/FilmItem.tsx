import styles from './FilmItem.module.scss';

export type FilmItemProps = {
  name: string;
  youtubeUrl: string;
  previewImagePath: string;
};

export function FilmItem(props: FilmItemProps) {
  // TODO: play youtube video
  // TODO: move button to button component with variant
  // TODO: use next image
  const { youtubeUrl, name, previewImagePath } = props;

  return (
    <div className={styles.item}>
      <img className={styles.item__image} src={previewImagePath} />
      <button className={styles.item__button}>{name}</button>
    </div>
  );
}
