import {
  SocialNetworkLink,
} from './social-network-link/SocialNetworkLink';
import styles from './SocialLinks.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

export const SocialLinks: FC<{ className?: string }> = ({ className }) => {
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

  const links = socialMedias.map(item => (
    <SocialNetworkLink key={item.variant} {...item} />
  ));

  return <ul className={clsx(styles.items, className)}>
    {links}
  </ul>;
};
