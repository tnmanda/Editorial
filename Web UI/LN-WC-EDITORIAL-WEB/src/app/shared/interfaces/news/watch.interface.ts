import { LanguageType } from '../../models/admin/types/language-type.model';

export interface IWatch {
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
