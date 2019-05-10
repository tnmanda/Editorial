import { NewsQueueEntry } from './news-queue-entry.model';

export class NewsPostData {
  feedItemQueue: NewsQueueEntry;
  hrToken?: any;
  workItemGuid: string;
}

export class LockData {
  workUnitTypeID: number;
  appUserID: number;
  idFromWorkUnitsDBTable: number;
}

