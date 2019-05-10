import { IAlertName } from '../../interfaces/alerts/alert-name.interface';

export class AlertName implements IAlertName {
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
