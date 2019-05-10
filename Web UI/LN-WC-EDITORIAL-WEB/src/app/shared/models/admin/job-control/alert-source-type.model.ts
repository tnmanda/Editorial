import { IAlertSourceType } from 'src/app/shared/interfaces/admin/job-control/alert-source-type.interface';

export class AlertSourceType implements IAlertSourceType {
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
