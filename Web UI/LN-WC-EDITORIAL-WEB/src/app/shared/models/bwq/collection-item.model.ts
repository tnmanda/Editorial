import { Collection } from './collection.model';
import { ICollectionItem } from '../../interfaces/bwq/collection-item.interface';

export class CollectionItem implements ICollectionItem {
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
