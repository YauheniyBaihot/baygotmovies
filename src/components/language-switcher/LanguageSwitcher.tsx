import {Button, Text} from '@mantine/core';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC} from 'react';

export const LanguageSwitcher: FC<{asButton?: boolean; className?: string}> = ({asButton, className}) => {
  const {locale, locales, pathname} = useRouter();

  const localeDivider = <>&nbsp;|&nbsp;</>;
  const localeButtonText = locales?.map((l, index) => (
    <Text key={l} fw={locale === l ? 'bold' : 'normal'} tt="uppercase">
      {index !== 0 && localeDivider}
      {l}
    </Text>
  ));
  const newLocale = locales?.find(l => l !== locale);

  return asButton ? (
    <Button component={Link} href={pathname} locale={newLocale} className={className}>
      {localeButtonText}
    </Button>
  ) : (
    <Link href={pathname} locale={newLocale} className={className}>
      {' '}
      {localeButtonText}
    </Link>
  );
};
