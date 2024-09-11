import { FC, forwardRef } from 'react';
import Link from 'next/link';
import styles from './ContactMeButton.module.scss';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type ContactMeButtonProps = {
  className?: string;
  variant?: 'black' | 'white';
}

const LinkComponent = forwardRef<HTMLAnchorElement, ContactMeButtonProps>(({ className, variant }, ref) => {
  variant ??= 'black';

  return <Link ref={ref} href={'/contact'} className={clsx(styles.button, className)}
               data-variant={variant}>Contact
    Me</Link>;
});

const MotionLinkComponent = motion.create(LinkComponent);


export const ContactMeButton: FC<ContactMeButtonProps> = ({ className, variant }) => {

  return <MotionLinkComponent
    className={className}
    variant={variant}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }} />;
};