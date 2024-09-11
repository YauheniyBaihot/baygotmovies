import variables from '@/styles/Variables.module.scss';
import Image, { StaticImageData } from 'next/image';
import styles from './FilmItem.module.scss';
import { motion } from 'framer-motion';

export type FilmItemProps = {
  name: string;
  link: string;
  previewImage: string;
};

export function FilmItem(props: FilmItemProps) {
  const { link, name, previewImage } = props;

  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        <Image
          src={previewImage}
          sizes={`${variables.mediaHalfSm}`}
          alt="image preview"
          fill
        />
      </div>

      <motion.a
        className={styles.button}
        target="_blank"
        href={link}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {name}
      </motion.a>
    </div>
  );
}
