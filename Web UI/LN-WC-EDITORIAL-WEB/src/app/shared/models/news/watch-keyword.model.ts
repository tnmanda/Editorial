import { IWatchKeyword } from '../../interfaces/news/watch-keyword.interface';

export class WatchKeyword implements IWatchKeyword {
  pkKeywordID: number;
  keyword: string;
  fkWatchID: number;
  engTran: string;
  dateAdded: string;
}
