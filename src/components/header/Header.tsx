import {Group} from '@mantine/core';
import {FC} from 'react';

import {ContactMeButton} from '@/components/contact-me-button/ContactMeButton';
import {SiteLogo} from '@/components/site-logo/SiteLogo';
import {SocialLinks} from '@/components/social-links/SocialLinks';

export const Header: FC = () => {
  return (
    <Group component="header" px="var(--app-padding-x)" wrap="nowrap" justify="space-between" pt="var(--app-padding-y)">
      <SiteLogo color="bright"></SiteLogo>
      <Group justify="end" wrap="nowrap">
        <SocialLinks color="main-grey" />
        <ContactMeButton />
      </Group>
    </Group>
  );
};
