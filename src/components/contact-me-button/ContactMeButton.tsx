import {Button} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import {FC} from 'react';

type ContactMeButtonProps = {
  className?: string;
  variant?: string;
};

export const ContactMeButton: FC<ContactMeButtonProps> = ({className, variant}) => {
  const {t} = useTranslation();

  return (
    <Button className={className} component={Link} href="./contact" variant={variant}>
      {t('contactMe')}
    </Button>
  );
};
