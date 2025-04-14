import {Button, Menu, MenuDropdown, MenuTarget, Stack} from '@mantine/core';
import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import {FC} from 'react';

import {LanguageSwitcher} from '@/components/language-switcher/LanguageSwitcher';
import {NavigationSection} from '@/models/site-block';

type NavigationMenuProps = {
  className?: string;
  sections: NavigationSection[];
};

export const NavigationMenu: FC<NavigationMenuProps> = ({className, sections}) => {
  const {t} = useTranslation(['data', 'common']);

  const links = sections.map(({nameKey, path}) => (
    <Button key={nameKey} component={Link} href={`/#${path}`}>
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
          <Button component={Link} href="/about">
            {t('common:aboutMe')}
          </Button>
          <LanguageSwitcher asButton />
        </Stack>
      </MenuDropdown>
    </Menu>
  );
};
