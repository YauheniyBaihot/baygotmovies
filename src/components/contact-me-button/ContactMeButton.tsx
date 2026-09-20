'use client';

import {Button} from '@mantine/core';
import {useT as useTranslation} from 'next-i18next/client';
import Link from 'next/link';
import {FC} from 'react';

type ContactMeButtonProps = {
  className?: string;
  variant?: string;
};

export const ContactMeButton: FC<ContactMeButtonProps> = ({className, variant}) => {
  const {t, i18n} = useTranslation();
  const href = i18n.language === 'lt' ? '/lt/contact' : '/contact';

  return (
    <Button className={className} component={Link} href={href} variant={variant}>
      {t('contactMe')}
    </Button>
  );
};
