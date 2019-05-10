import { IAlertDisposition } from '../interfaces/alert-disposition.interface';

export class AlertDisposition implements IAlertDisposition {
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
