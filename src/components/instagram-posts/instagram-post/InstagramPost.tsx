import variables from '@/styles/Variables.module.scss';
import styles from './InstagramPost.module.scss';

import Image, { StaticImageData } from 'next/image';
import PlayIcon from '@/icons/play.svg';
import { motion } from 'framer-motion';

export type InstagramPostProps = {
  instagramUrl: string;
  imagePreview: string;
};

export function InstagramPost(props: InstagramPostProps) {
  const { instagramUrl, imagePreview } = props;

  return (
    <div className={styles.post}>
      <Image
        src={imagePreview}
        fill
        sizes={`${variables.mediaHalfSm}`}
        style={{ objectFit: 'cover' }}
        alt="Preview image for instagram post"
      />
      <motion.a
        href={instagramUrl}
        target="_blank"
        className={styles.link}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <PlayIcon />
      </motion.a>
    </div>
  );
}
