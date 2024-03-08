import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Close,
} from '@radix-ui/react-dialog';

import { motion } from 'framer-motion';

import CloseIcon from '@/icons/close.svg';

import styles from './YoutubeButton.module.scss';
import buttonStyles from '@/components/button/Button.module.scss';

type YoutubeButtonProps = {
  videoId: string;
  text: string;
};

export function YoutubeButton(props: YoutubeButtonProps) {
  const { videoId, text } = props;

  return (
    <Root>
      <Trigger asChild>
        <motion.button className={buttonStyles.button}
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
        >{text}</motion.button>
      </Trigger>
      <Portal>
        <Overlay className={styles.DialogOverlay} />
        <Content className={styles.DialogContent}>
          <Close asChild>
            <motion.button
              aria-label="Close"
              className={styles.DialogClose}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}>
              <CloseIcon className={styles.DialogCloseIcon} />
            </motion.button>
          </Close>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </Content>

      </Portal>
    </Root>
  );
}
