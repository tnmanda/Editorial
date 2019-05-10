import { INewsWatch } from '../interfaces/news-watch.interface';

export class NewsWatch implements INewsWatch {
  pkWatchID: number;
  caption: string;
  description?: any;
  inArtikleTitle: boolean;
  inArtikleDescription: boolean;
  wholeWords?: any;
  mAtchAllKeywords: boolean;
  fkLanguageID: number;
  comments?: any;
  lastFilterDate: string;
}
