import {Stack, Text, Title} from '@mantine/core';
import {Trans, useTranslation} from 'next-i18next';
import Image from 'next/image';

import styles from './AboutMe.module.css';

export function AboutMe() {
  const {t} = useTranslation();

  return (
    <div className={styles.block}>
      <Stack className={styles.title}>
        <Title>{t('aboutMe')}</Title>
        <Title order={3} c="main-grey">
          <q>{t('aboutMePage.title')}</q>
        </Title>
      </Stack>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src="/version1/me/me.jpg" alt="My photo" fill sizes="(min-width: 62em) 25vw,(max-width: 62em) 50vw" priority></Image>
      </div>

      <Text className={styles.mainText} component="div">
        <Trans t={t} i18nKey="aboutMePage.main" components={{1: <p />}} />
      </Text>
    </div>
  );
}
