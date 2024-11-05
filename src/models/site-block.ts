import {ParseKeys} from 'i18next';

export type ShortDate = {
  year: number;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export type YoutubeVideo = {
  id: string;
  preview: string;
  vertical?: boolean;
};

export type VideoWork = {
  nameKey: ParseKeys<'data'>;
  titleKey: ParseKeys<'data'>;
  dateTitle?: ParseKeys<'data'>;
  date?: ShortDate;
  youtubeIds: [YoutubeVideo, YoutubeVideo] | [YoutubeVideo];
};

export type Moment = {
  nameKey?: ParseKeys<'data'>;
  date?: ShortDate;
  title?: ParseKeys<'data'>;
  source: string;
};

export type NavigationSection = {
  nameKey: ParseKeys<'data'>;
  path: string;
};

export type SiteBlock = NavigationSection & {
  works: VideoWork[];
  moments: Moment[];
  momentsToShowCount: number;
  titleKey?: ParseKeys<'data'>;
  subTitleKey?: ParseKeys<'data'>;
  watchButtonKey: ParseKeys<'data'>;
};
