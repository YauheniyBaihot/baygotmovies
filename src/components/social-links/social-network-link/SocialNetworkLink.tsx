import TelegramIcon from '@/icons/telegram.svg';
import MessengerIcon from '@/icons/messenger.svg';
import InstagramIcon from '@/icons/instagram.svg';
import WhatsappIcon from '@/icons/whatsapp.svg';
import styles from './SocialNetworkLink.module.scss';
import { motion } from 'framer-motion';

export type SocialNetworkLinkProps = {
  variant: string;
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
    case 'whatsapp':
      icon = <WhatsappIcon {...iconProps} />;
      break;
    default:
      throw new Error(`Unknown variant  ${variant}`);
  }

  return (
    <li className={styles.listItem}>
      <motion.a
        href={path}
        className={styles.link}
        target="_blank"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
      </motion.a>
    </li>

  );
}
