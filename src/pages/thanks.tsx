import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {FC} from 'react';

import {Header} from '@/components/header/Header';
import {ThankYou} from '@/components/thank-you/ThankYou';

const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'data'])),
    },
  };
};

const Thanks: FC = () => {
  return (
    <>
      <Header />
      <ThankYou />
    </>
  );
};

export {getStaticProps};

export default Thanks;
