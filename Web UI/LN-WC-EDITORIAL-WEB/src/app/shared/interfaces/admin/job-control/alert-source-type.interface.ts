export interface IAlertSourceType {
  alertSourceTypeID: number;
  alertTypeDescription: string;
  sortOrder: number;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
