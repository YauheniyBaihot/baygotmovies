import {SiteBlock} from '@/models/site-block';

export const siteBlocks: SiteBlock[] = [
  {
    alwaysExpanded: true,
    nameKey: 'weddings.name',
    titleKey: 'weddings.title',
    subTitleKey: 'weddings.subTitle',
    watchButtonKey: 'weddings.button',
    path: 'weddings',
    works: [
      {
        nameKey: 'weddings.works.fairytale.name',
        titleKey: 'weddings.works.fairytale.title',
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/fairytale-1.jpg',
            id: 'sItnWhco47g',
          },
          {
            preview: '/version2/images/youtube-previews/weddings/fairytale-2.jpg',
            id: 'SqHPxXwN7CI',
          },
        ],
      },
      {
        nameKey: 'weddings.works.loveLaughParty.name',
        titleKey: 'weddings.works.loveLaughParty.title',
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/love-laugh-party-1.jpg',
            id: 'ngCW-u1IXGs',
          },
          {
            preview: '/version2/images/youtube-previews/weddings/love-laugh-party-2.jpg',
            id: 'foDsG2zjQw8',
          },
        ],
      },
      {
        nameKey: 'weddings.works.eurovisionVibes.name',
        titleKey: 'weddings.works.eurovisionVibes.title',
        date: {
          month: 7,
          year: 2025,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/eurovision-vibes.jpg',
            id: '6AZaKYkiTP4',
          },
        ],
      },
      {
        nameKey: 'weddings.works.bubriskoDvaras.name',
        titleKey: 'weddings.works.bubriskoDvaras.title',
        date: {
          month: 8,
          year: 2024,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/bubrisko-dvaras-1.jpg',
            id: 'rDTQZN2q3D4',
          },
          {
            preview: '/version2/images/youtube-previews/weddings/bubrisko-dvaras-2.jpg',
            id: 'gvWe7GUBPVg',
          },
        ],
      },
      {
        nameKey: 'weddings.works.gorgeousNewlyweds.name',
        titleKey: 'weddings.works.gorgeousNewlyweds.title',
        date: {
          month: 8,
          year: 2024,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/gorgeous-newlyweds-2.jpg',
            id: 'cMv389XtnqY',
          },
          {
            preview: '/version2/images/youtube-previews/weddings/gorgeous-newlyweds-1.jpg',
            id: 'scP1UEmM7rg',
          },
        ],
      },
      {
        nameKey: 'weddings.works.rockNPink.name',
        titleKey: 'weddings.works.rockNPink.title',
        date: {
          month: 4,
          year: 2024,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/rock-n-pink-1.jpg',
            id: 'w8m8z73Ljxc',
          },
          {
            preview: '/version2/images/youtube-previews/weddings/rock-n-pink-2.jpg',
            id: 'tvtQz164F9s',
          },
        ],
      },
      {
        nameKey: 'weddings.works.funnyWedding.name',
        titleKey: 'weddings.works.funnyWedding.title',
        date: {
          month: 7,
          year: 2024,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/funny-wedding-2.jpg',
            id: '2TB5gGQk6U4',
          },
        ],
      },
      {
        nameKey: 'weddings.works.blueEyedAngel.name',
        titleKey: 'weddings.works.blueEyedAngel.title',
        date: {
          month: 10,
          year: 2023,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/weddings/blue-eyed-angel.jpg',
            id: '0eD4OtwCtWk',
          },
        ],
      },
    ],
    moments: [
      {
        nameKey: 'weddings.moments.blueEyedAngel.name',
        source: 'moments/weddings/blue-eyed-angel',
        date: {
          month: 11,
          year: 2023,
        },
      },
      {
        nameKey: 'weddings.moments.cherryManor.name',
        source: 'moments/weddings/cherry-manor',
        date: {
          month: 8,
          year: 2024,
        },
      },
      {
        nameKey: 'weddings.moments.dvaras.name',
        source: 'moments/weddings/dvaras',
        date: {
          month: 8,
          year: 2024,
        },
      },
      {
        nameKey: 'weddings.moments.eurovision.name',
        source: 'moments/weddings/eurovision',
        date: {
          month: 8,
          year: 2025,
        },
      },
      {
        nameKey: 'weddings.moments.fairytale.name',
        source: 'moments/weddings/fairytale',
        date: {
          month: 5,
          year: 2025,
        },
      },
      {
        nameKey: 'weddings.moments.loveparty.name',
        source: 'moments/weddings/loveparty',
        date: {
          month: 7,
          year: 2025,
        },
      },
      {
        nameKey: 'weddings.moments.newlyweds.name',
        source: 'moments/weddings/newlyweds',
        date: {
          month: 8,
          year: 2024,
        },
      },
      {
        nameKey: 'weddings.moments.rockNPink.name',
        source: 'moments/weddings/rock-n-pink',
        date: {
          month: 5,
          year: 2024,
        },
      },
    ],
    momentsToShowCount: 8,
  },
  {
    nameKey: 'loveStory.name',
    titleKey: 'loveStory.title',
    subTitleKey: 'loveStory.subTitle',
    watchButtonKey: 'loveStory.button',
    path: 'loveStory',
    works: [
      {
        nameKey: 'loveStory.works.katyaAndRitis.name',
        titleKey: 'loveStory.works.katyaAndRitis.title',
        date: {
          month: 5,
          year: 2024,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/love-stories/katya-and-ritis.jpg',
            id: 'H9CLDf6LGm0',
          },
        ],
      },
      {
        nameKey: 'loveStory.works.edvinAndCosmina.name',
        titleKey: 'loveStory.works.edvinAndCosmina.title',
        date: {
          month: 9,
          year: 2024,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/love-stories/edvin-and-cosmina.jpg',
            id: 'tDDNd4VEeb4',
          },
        ],
      },
    ],
    moments: [
      {
        nameKey: 'loveStory.moments.aciuaTau.name',
        date: {
          month: 7,
          year: 2023,
        },
        source: 'moments/lovestory/aciua-tau',
      },
      {
        nameKey: 'loveStory.moments.katyaAndRitis.name',
        date: {
          month: 5,
          year: 2024,
        },
        source: 'moments/lovestory/katya-and-ritis',
      },
    ],
    momentsToShowCount: 2,
  },
  {
    nameKey: 'santorini.name',
    path: 'santorini',
    watchButtonKey: 'santorini.button',
    works: [
      {
        nameKey: 'santorini.works.proposal.name',
        titleKey: 'santorini.works.proposal.title',
        date: {
          month: 7,
          year: 2023,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/santorini/proposal.jpg',
            id: 'wEvrn2vTfjw',
          },
        ],
      },
      {
        nameKey: 'santorini.works.goldenWedding.name',
        titleKey: 'santorini.works.goldenWedding.title',
        date: {
          month: 7,
          year: 2023,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/santorini/golden-wedding.jpg',
            id: 's-Ib4mFlgI0',
          },
        ],
      },
      {
        nameKey: 'santorini.works.musicClip.name',
        titleKey: 'santorini.works.musicClip.title',
        date: {
          month: 7,
          year: 2023,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/santorini/music-clip.jpg',
            id: '1VQZ-1WFoGM',
          },
        ],
      },
      {
        nameKey: 'santorini.works.donkeyExperience.name',
        titleKey: 'santorini.works.donkeyExperience.title',
        date: {
          month: 7,
          year: 2023,
        },
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/santorini/donkey-experience.jpg',
            id: 'EMD2_PQ9zCc',
            vertical: true,
          },
        ],
      },
    ],
    moments: [
      {
        nameKey: 'santorini.moments.drone.name',
        date: {
          month: 7,
          year: 2023,
        },
        source: 'moments/santorini/drone',
      },
      {
        nameKey: 'santorini.moments.musicClip.name',
        date: {
          month: 7,
          year: 2023,
        },
        source: 'moments/santorini/music-clip',
      },
      {
        nameKey: 'santorini.moments.proposal.name',
        date: {
          month: 7,
          year: 2023,
        },
        source: 'moments/santorini/proposal',
      },
      {
        nameKey: 'santorini.moments.wedding.name',
        date: {
          month: 7,
          year: 2023,
        },
        source: 'moments/santorini/wedding',
      },
    ],
    momentsToShowCount: 3,
  },
  {
    nameKey: 'otherWorks.name',
    path: 'otherWorks',
    watchButtonKey: 'otherWorks.button',
    alwaysExpanded: true,
    works: [
      {
        nameKey: 'otherWorks.works.corporateParty.name',
        titleKey: 'otherWorks.works.corporateParty.title',
        dateTitle: 'otherWorks.works.corporateParty.dateTitle',
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/other/corporate-party.jpg',
            id: 'Qd_17NJzh4M',
          },
        ],
      },
      {
        nameKey: 'otherWorks.works.christening.name',
        dateTitle: 'otherWorks.works.christening.dateTitle',
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/other/christening.jpg',
            id: 'tOgJYu6K7dU',
          },
        ],
      },
      {
        nameKey: 'otherWorks.works.event.name',
        titleKey: 'otherWorks.works.event.title',
        dateTitle: 'otherWorks.works.event.dateTitle',
        youtubeIds: [
          {
            preview: '/version2/images/youtube-previews/other/event.jpg',
            id: 'CfvqvDpW99k',
            vertical: true,
          },
        ],
      },
    ],
    moments: [],
    momentsToShowCount: 0,
  },
];
