import { INews } from '../../interfaces/news/news.interface';

export class News implements INews {
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

export class NewsHRToken {
  Token: string;
  ModuleTableEntryID: number;
  ProfileId: number;
}

export class NewsObject {
  workItemGuid: number;
  success: boolean;
  message: string;
}
