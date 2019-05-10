import { INewsQueueEntry } from '../interfaces/news-queue-entry.interface';

export class NewsQueueEntry implements INewsQueueEntry {
  id: number;
  fkItemID: number;
  fkWatchID: number;
  fkCountryID: number;
  itemType: number;
  state: number;
  stateChanged: string;
  dateAdded: string;
  stateChangedRecipient: number;
}
