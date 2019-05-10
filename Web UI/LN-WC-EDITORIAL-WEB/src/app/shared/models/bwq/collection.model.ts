import { ICollection } from '../../interfaces/bwq/collection.interface';

export class Collection implements ICollection {
  collectionID: number;
  collectionName: string;
  collectionDescription: string;
  sortOrder: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
