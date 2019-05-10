export interface INews {
  id: number;
  fkItemID: number;
  fkWatchID: number;
  fkCountryID: number;
  itemType: number;
  state: number;
  dateAdded: string;
  watchName: string;
  articleID: number;
  articleTitle: string;
  articleDescription: string;
  articleURL: string;
  feedID: number;
  feedName: string;
  feedURL: string;
}
