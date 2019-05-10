import { IAppUserAbsence } from '../../../interfaces/admin/app_user/app-user-absence.interface';
import { AbsenceType } from '../types/absence-type.model';

export class AppUserAbsence implements IAppUserAbsence {
  appUserAbsenceID: number;
  appUserID: number;
  startDateUTC: string;
  endDateUTC: string;
  absenceTypeID: number;
  absenceTypeName: string;
  notes: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  absenceType: AbsenceType;
}
