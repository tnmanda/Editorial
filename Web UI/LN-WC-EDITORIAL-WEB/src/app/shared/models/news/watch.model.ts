import { IWatch } from '../../interfaces/news/watch.interface';
import { LanguageType } from '../admin/types/language-type.model';

export class Watch implements IWatch {
  pkWatchID: number;
  caption: string;
  description: string;
  inArtikleTitle: boolean;
  inArtikleDescription: boolean;
  wholeWords: string;
  mAtchAllKeywords: boolean;
  fkLanguageID: number;
  comments: string;
  lastFilterDate: string;

  language: LanguageType;
}
