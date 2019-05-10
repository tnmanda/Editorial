export interface IAlertPriority {
  collectionItemID: number;
  collectionID: number;
  sortOrder: number;
  itemText: string;
  itemValue: string;
  itemDescription: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
  collection?: any;
}
