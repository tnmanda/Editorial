export interface INewsArticle {
  pkArtikleID: number;
  url: string;
  title: string;
  artikleDescription: string;
  fkFeedID: number;
  dateAdded: string;
  uniqKey: string;
  uniqContent: string;
  uniqTitle: string;
}
