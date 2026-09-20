'use client';

import {Button, Menu, MenuDropdown, MenuTarget, Stack} from '@mantine/core';
import {useT as useTranslation} from 'next-i18next/client';
import Link from 'next/link';
import {FC} from 'react';

import {LanguageSwitcher} from '@/components/language-switcher/LanguageSwitcher';
import {NavigationSection} from '@/models/site-block';

type NavigationMenuProps = {
  className?: string;
  sections: NavigationSection[];
};

export const NavigationMenu: FC<NavigationMenuProps> = ({className, sections}) => {
  const {t, i18n} = useTranslation(['data', 'common']);
  const prefix = i18n.language === 'lt' ? '/lt' : '';

  const links = sections.map(({nameKey, path}) => (
    <Button key={nameKey} component={Link} href={`${prefix}/#${path}`}>
      {t(nameKey)}
    </Button>
  ));

  return (
    <Menu position="bottom-end">
      <MenuTarget>
        <Button className={className}>{t('common:header.menu')}</Button>
      </MenuTarget>

      <MenuDropdown bg="none" bd="none">
        <Stack>
          {links}
          <Button component={Link} href={`${prefix}/about`}>
            {t('common:aboutMe')}
          </Button>
          {/* <LanguageSwitcher asButton /> */}
        </Stack>
      </MenuDropdown>
    </Menu>
  );
};
