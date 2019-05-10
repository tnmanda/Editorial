import { Collection } from '../../models/bwq/collection.model';


export interface ICollectionItem {
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

  collection: Collection;
}
