import { IAlertNames } from '../interfaces/alert-names.interface';

export class AlertNames implements IAlertNames {
  alertNameID: number;
  alertJobsID: number;
  nameEntry: string;
  subDidivision?: any;
  entryDateUTC: string;
  deletedDateUTC: string;
  id_mdb?: any;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
