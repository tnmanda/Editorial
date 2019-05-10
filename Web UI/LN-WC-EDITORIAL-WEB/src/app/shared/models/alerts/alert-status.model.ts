import { IAlertStatus } from '../../interfaces/alerts/alert-status.interface';

export class AlertStatus implements IAlertStatus {
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
