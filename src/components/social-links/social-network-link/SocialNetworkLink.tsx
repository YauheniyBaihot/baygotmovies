import {ActionIcon} from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import InstagramIcon from '@/icons/instagram.svg';
import MessengerIcon from '@/icons/messenger.svg';
import TelegramIcon from '@/icons/telegram.svg';
import WhatsappIcon from '@/icons/whatsapp.svg';

import styles from './SocialNetworkLink.module.css';

export type SocialNetworkLinkProps = {
  variant: string;
  path: string;
  color?: string;
};

export function SocialNetworkLink(props: SocialNetworkLinkProps) {
  const {variant, path, color} = props;

  let icon;

  switch (variant) {
    case 'messenger':
      icon = <MessengerIcon />;
      break;
    case 'telegram':
      icon = <TelegramIcon />;
      break;
    case 'instagram':
      icon = <InstagramIcon />;
      break;
    case 'whatsapp':
      icon = <WhatsappIcon />;
      break;
    default:
      throw new Error(`Unknown variant  ${variant}`);
  }

  return (
    <ActionIcon variant="transparent" aria-label={variant} component={Link} href={path} target="_blank" color={color} className={styles.icon}>
      {icon}
    </ActionIcon>
  );
}
