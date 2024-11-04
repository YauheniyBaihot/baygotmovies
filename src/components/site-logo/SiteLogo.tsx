import {Title} from '@mantine/core';
import clsx from 'clsx';
import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import {FC} from 'react';

import styles from './SiteLogo.module.css';

export const SiteLogo: FC<{color?: string; className?: string}> = ({color, className}) => {
  const {t} = useTranslation();

  return (
    <Link href="./" className={clsx(styles.link, className)}>
      <Title lineClamp={1} c={color}>
        {t('siteName')}
      </Title>
    </Link>
  );
};
