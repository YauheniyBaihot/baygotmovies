import {Box, Stack, Text} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import React, {ForwardRefRenderFunction, forwardRef} from 'react';

import {ContactMeButton} from '@/components/contact-me-button/ContactMeButton';
import {EmailMe} from '@/components/email-me/EmailMe';
import {LanguageSwitcher} from '@/components/language-switcher/LanguageSwitcher';
import {SiteLogo} from '@/components/site-logo/SiteLogo';
import {SocialLinks} from '@/components/social-links/SocialLinks';
import {NavigationSection} from '@/models/site-block';

import styles from './Footer.module.css';

type FooterProps = {
  sections: NavigationSection[];
};
const FooterInternal: ForwardRefRenderFunction<HTMLDivElement, FooterProps> = ({sections}, ref) => {
  const {t} = useTranslation(['common', 'data']);

  const siteLinks = sections.map(({path, nameKey}) => (
    <Link key={path} href={`/#${path}`} className={styles.link}>
      {t(nameKey, {ns: 'data'})}
    </Link>
  ));

  return (
    <Box ref={ref} className={styles.footer} component="footer" c="main-grey">
      <SiteLogo className={styles.logo} color="bright" />

      <Stack>{siteLinks}</Stack>

      <Stack>
        <Link href={'/about'} className={styles.link}>
          {t('aboutMe')}
        </Link>
        <LanguageSwitcher className={styles.link} />
      </Stack>

      <Stack className={styles.contacts}>
        <Text>{t('contacts')}</Text>
        <SocialLinks color="main-grey" />
        <EmailMe />
        <ContactMeButton />
      </Stack>
    </Box>
  );
};

export const Footer = forwardRef(FooterInternal);
