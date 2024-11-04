import {Text, Title} from '@mantine/core';
import clsx from 'clsx';
import {ParseKeys} from 'i18next';
import {useTranslation} from 'next-i18next';
import {FC} from 'react';

import {ShortDate} from '@/models/site-block';

import styles from './VideoTitle.module.css';

export const VideoTitle: FC<{
  nameKey?: ParseKeys<'data'>;
  date?: ShortDate;
  dateTitle?: ParseKeys<'data'>;
  className?: string;
  index: number;
}> = ({nameKey, date, dateTitle, className, index}) => {
  const {t} = useTranslation(['data', 'common']);

  return (
    <div className={clsx(styles.block, className)} data-index={index}>
      <div className={styles.innerBlock}>
        {nameKey && (
          <Title order={3} lineClamp={1}>
            <q>{t(nameKey)}</q>
          </Title>
        )}
        {date && (
          <Text lineClamp={1} c="main-grey">
            {t('common:intlDate', {
              date: new Date(date.year, date.month),
              formatParams: {
                date: {month: 'long', year: 'numeric'},
              },
            })}
          </Text>
        )}
        {dateTitle && (
          <Text lineClamp={1} c="main-grey">
            {t(dateTitle)}
          </Text>
        )}
      </div>
    </div>
  );
};
