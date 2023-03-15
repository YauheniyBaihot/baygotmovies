import styles from './Film.module.scss';
import { FilmItemProps, FilmItem } from './films-item/FilmItem';

type FilmsProps = {
  items: FilmItemProps[];
};

export function Films(props: FilmsProps) {
  // const { items } = props;
  // TODO: pass items from top

  const items: FilmItemProps[] = [
    {
      name: 'Family',
      previewImagePath: 'images/6.JPG',
      youtubeUrl: 'test',
    },
    {
      name: 'Love story',
      previewImagePath: 'images/7.JPG',
      youtubeUrl: 'test',
    },
    {
      name: 'Event',
      previewImagePath: 'images/9.JPG',
      youtubeUrl: 'test',
    },
    {
      name: 'About you',
      previewImagePath: 'images/8.JPG',
      youtubeUrl: 'test',
    },
  ];

  const itemsElements = items.map(item => (
    <FilmItem key={item.name} {...item} />
  ));

  return (
    <div className={styles.films}>
      <div className={styles.backgroundOverlay2}></div>
      <h3 className={styles.films__title}>Welcome to my heartwarming world</h3>
      <div className={styles.films__container}>{itemsElements}</div>
    </div>
  );
}
