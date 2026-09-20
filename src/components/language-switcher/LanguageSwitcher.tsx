'use client';

import {Button, Text} from '@mantine/core';
import {useT} from 'next-i18next/client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FC} from 'react';

import i18nConfig from '@/i18n.config';

export const LanguageSwitcher: FC<{asButton?: boolean; className?: string}> = ({asButton, className}) => {
  const {i18n} = useT();
  const currentLocale = i18n.language || i18nConfig.fallbackLng;
  const locales = i18nConfig.supportedLngs;
  const pathname = usePathname() || '/';

  const localeDivider = <>&nbsp;|&nbsp;</>;
  const localeButtonText = locales.map((l, index) => (
    <Text key={l} fw={currentLocale === l ? 'bold' : 'normal'} tt="uppercase">
      {index !== 0 && localeDivider}
      {l}
    </Text>
  ));

  const targetLocale = locales.find(l => l !== currentLocale) ?? i18nConfig.fallbackLng;

  let targetHref = pathname;
  if (targetLocale === i18nConfig.fallbackLng) {
    targetHref = pathname.replace(/^\/lt(?=\/|$)/, '') || '/';
  } else {
    if (!pathname.startsWith(`/${targetLocale}`)) {
      targetHref = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
    }
  }

  const handleClick = () => {
    document.cookie = `i18next=${targetLocale};path=/;max-age=31536000;SameSite=Lax`;
  };

  return asButton ? (
    <Button component={Link} href={targetHref} onClick={handleClick} className={className}>
      {localeButtonText}
    </Button>
  ) : (
    <Link href={targetHref} onClick={handleClick} className={className}>
      {' '}
      {localeButtonText}
    </Link>
  );
};
