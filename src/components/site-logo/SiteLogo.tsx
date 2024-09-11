import { FC } from 'react';
import styles from './SiteLogo.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

export const SiteLogo: FC<{ className?: string }> = ({ className }) => {
  return <Link className={clsx(className, styles.link)} href="./">
    Baygotmovies
  </Link>;
};