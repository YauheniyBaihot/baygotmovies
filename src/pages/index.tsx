import {GetServerSideProps} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {FC, useMemo} from 'react';

import {HeaderWithVideo} from '@/components/header-with-video/HeaderWithVideo';
import {MainPageBlock} from '@/components/main-page-block/MainPageBlock';
import {siteBlocks} from '@/data';
import {SiteBlock} from '@/models/site-block';
import {shuffle} from '@/utils/array-utils';

type HomeProps = {
  blocks: SiteBlock[];
};

const getServerSideProps: GetServerSideProps<HomeProps> = async ({locale}) => {
  // const forwarded = req.headers['x-forwarded-for'];

  // const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
  // const randomNumber =ip?.split('')?.reduce((a, b) => a + b.charCodeAt(0), 0) ?? 151;
  const randomNumber = Math.random();
  const blocks = siteBlocks.map(block => ({
    ...block,
    moments: shuffle(block.moments, randomNumber).slice(0, block.momentsToShowCount),
  }));

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'header', 'data'])),
      blocks,
    },
  };
};

// TODO: set viewport, favicon, description
const Home: FC<HomeProps> = ({blocks}) => {
  const blocksElements = useMemo(() => {
    return blocks.map(block => {
      return <MainPageBlock key={block.path} block={block} />;
    });
  }, [blocks]);

  return (
    <>
      <HeaderWithVideo sections={blocks} />
      <div>{blocksElements}</div>
    </>
  );
};

export {getServerSideProps};
export default Home;
