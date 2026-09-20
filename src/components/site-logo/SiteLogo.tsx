'use client';

import {Title} from '@mantine/core';
import clsx from 'clsx';
import {useT as useTranslation} from 'next-i18next/client';
import Link from 'next/link';
import {FC} from 'react';

import styles from './SiteLogo.module.css';

export const SiteLogo: FC<{color?: string; className?: string}> = ({color, className}) => {
  const {t, i18n} = useTranslation();
  const href = i18n.language === 'lt' ? '/lt' : '/';

  return (
    <Link href={href} className={clsx(styles.link, className)}>
      <Title lineClamp={1} c={color}>
        {t('siteName')}
      </Title>
    </Link>
  );
};
