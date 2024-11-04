import {GetStaticProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {FC} from 'react';

import {AboutMe} from '@/components/about-me/AboutMe';
import {Header} from '@/components/header/Header';

const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'data'])),
    },
  };
};

const About: FC = () => {
  return (
    <>
      <Header />
      <AboutMe />
    </>
  );
};

export {getStaticProps};

export default About;
