import {FC} from 'react';

import {AboutMe} from '@/components/about-me/AboutMe';
import {Header} from '@/components/header/Header';

const About: FC = () => {
  return (
    <>
      <Header />
      <AboutMe />
    </>
  );
};

export default About;
