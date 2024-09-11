﻿import { YoutubeButton } from '@/components/youtube-button/YoutubeButton';
import variables from '@/styles/Variables.module.scss';
import Image, { StaticImageData } from 'next/image';
import styles from './WeddingsItem.module.scss';

export type WeddingsItemProps = {
  image: string;
  header: string;
  text: JSX.Element;
  teaserUrl?: string;
  fullUrl?: string;
};

// TODO: open dialog with youtube video
export function WeddingsItem(props: WeddingsItemProps) {
  const { image, header, text, fullUrl, teaserUrl } = props;

  // TODO: translate this;
  // TODO: translate languages / language based on items count
  const viewTeaserText = 'Watch teaser';
  const viewFullText = 'Watch weddingfilm';

  /*TODO: use image from next js*/
  return (
    <div className={styles.item}>
      <div className={styles.photo}>
        <div className={styles.photoContainer}>
          <Image
            src={image}
            sizes={`(max-width: ${variables.mediaSm}) 100vw, ${variables.mediaSm}`}
            alt="couple photo"
            fill
          />
        </div>
      </div>
      <div className={styles.text}>
        <h4 className={styles.title}>{header}</h4>
        {text}
        <div className={styles.buttonsContainer}>
          {teaserUrl ? (
            <YoutubeButton videoId={teaserUrl} text={viewTeaserText} />
          ) : null}
          {fullUrl ? (
            <YoutubeButton videoId={fullUrl} text={viewFullText} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
