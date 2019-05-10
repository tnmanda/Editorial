export interface INewsQueueEntry {
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
