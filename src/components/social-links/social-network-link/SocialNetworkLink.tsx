import TelegramIcon from '@/icons/telegram.svg';
import MessengerIcon from '@/icons/messenger.svg';
import InstagramIcon from '@/icons/instagram.svg';
import styles from './SocialNetworkLink.module.scss';

export type SocialNetworkLinkProps = {
  variant: 'instagram' | 'messenger' | 'telegram';
  path: string;
};

export function SocialNetworkLink(props: SocialNetworkLinkProps) {
  const { variant, path } = props;

  let icon;
  const iconProps = {
    className: styles.icon,
  };

  switch (variant) {
    case 'messenger':
      icon = <MessengerIcon {...iconProps} />;
      break;
    case 'telegram':
      icon = <TelegramIcon {...iconProps} />;
      break;
    case 'instagram':
      icon = <InstagramIcon {...iconProps} />;
      break;
    default:
      throw new Error('Unknown variant', variant);
  }

  return (
    <a href={path} className={styles.link} target="_blank">
      {icon}
    </a>
  );
}
