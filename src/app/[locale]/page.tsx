import {FC} from 'react';

import {HeaderWithVideo} from '@/components/header-with-video/HeaderWithVideo';
import {MainPageBlock} from '@/components/main-page-block/MainPageBlock';
import {siteBlocks} from '@/data';
import {shuffle} from '@/utils/array-utils';

export const dynamic = 'force-dynamic';

const randomNumber = Math.random();

const App: FC = () => {
  const blocks = siteBlocks.map(block => ({
    ...block,
    moments: shuffle(block.moments, randomNumber).slice(0, block.momentsToShowCount),
  }));

  return (
    <>
      <HeaderWithVideo sections={blocks} />
      <div>
        {blocks.map(block => (
          <MainPageBlock key={block.path} block={block} />
        ))}
      </div>
    </>
  );
};

export default App;
