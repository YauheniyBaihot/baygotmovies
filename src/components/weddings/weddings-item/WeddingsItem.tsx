import { Button } from '@/components/button/Button';
import { YoutubeButton } from '@/components/youtube-button/YoutubeButton';
import Image from 'next/image';
import styles from './WeddingsItem.module.scss';

export type WeddingsItemProps = {
  reversed?: true;
  photoPath: string;
  header: string;
  text: string;
  languages: string[];
  teaserUrl: string;
  fullUrl: string;
};

// TODO: open dialog with youtube video
export function WeddingsItem(props: WeddingsItemProps) {
  const { photoPath, header, text, languages, reversed, fullUrl, teaserUrl } =
    props;

  const languagesText = languages.join(', ');
  // TODO: translate this;
  // TODO: translate languages / language based on items count
  const viewTeaserText = 'View teaser';
  const viewFullText = 'View full';

  /*TODO: use image from next js*/
  return (
    <div className={styles.item}>
      <div className={styles.item__photoContainer}>
        <img className={styles.item__photo} src={photoPath} />
      </div>
      <div className={styles.item__text}>
        <h4 className={styles.item__title}>{header}</h4>
        <p>{text}</p>
        <p>Languages: {languagesText}</p>
        <div className={styles.item__buttonsContainer}>
          <YoutubeButton videoId={teaserUrl} text={viewTeaserText} />
          <YoutubeButton videoId={fullUrl} text={viewFullText} />
        </div>
      </div>
    </div>
  );
}
