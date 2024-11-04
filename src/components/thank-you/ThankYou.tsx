import {Stack, Text, Title} from '@mantine/core';
import {Trans, useTranslation} from 'next-i18next';

import {EmailMe} from '@/components/email-me/EmailMe';
import {SocialLinks} from '@/components/social-links/SocialLinks';

import styles from './ThankYou.module.css';

export const ThankYou = () => {
  const {t} = useTranslation();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <Stack>
          <Title order={3} ff="text">
            <Trans t={t} i18nKey="thankYou.title" components={{1: <br />}} />
          </Title>
        </Stack>
        <div className={styles.secondSection}>
          <Text c="main-grey">
            <Trans t={t} i18nKey="thankYou.secondTitle" components={{1: <br />}} />
          </Text>
          <Stack gap="sm" mt="xl">
            <Title order={3}>{t('contactMe')}</Title>
            <SocialLinks />
            <EmailMe color="main-grey" />
          </Stack>
        </div>
      </div>
    </div>
  );
};
