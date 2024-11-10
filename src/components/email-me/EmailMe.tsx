import {Text} from '@mantine/core';
import Link from 'next/link';
import React, {FC} from 'react';

import styles from './EmailMe.module.css';

export const EmailMe: FC<{className?: string; color?: string}> = ({className, color}) => {
  const email = 'baygotmovies@gmail.com';

  return (
    <Text display="flex" className={className} c={color}>
      <Link className={styles.emailMe} href={`mailto:${email}`}>
        {email}
      </Link>
    </Text>
  );
};
