import {Group} from '@mantine/core';
import {FC} from 'react';

import {SocialNetworkLink} from './social-network-link/SocialNetworkLink';

export const SocialLinks: FC<{className?: string; color?: string}> = ({className, color}) => {
  const socialMedias = [
    {
      path: 'https://www.instagram.com/baygot_movies/',
      variant: 'instagram',
    },
    {
      path: 'https://t.me/fraubaygot',
      variant: 'telegram',
    },
    {
      path: 'https://m.me/baygotmovies',
      variant: 'messenger',
    },
    {
      path: 'https://wa.me/37068413646',
      variant: 'whatsapp',
    },
  ];

  const links = socialMedias.map(item => <SocialNetworkLink key={item.variant} {...item} color={color} />);

  return (
    <Group className={className} wrap="nowrap" gap="xs">
      {links}
    </Group>
  );
};
