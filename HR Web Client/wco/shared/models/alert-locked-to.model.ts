import { IAlertLockedTo } from '../interfaces/alert-locked-to.type';

export class AlertLockedTo implements IAlertLockedTo {
  appUserID: number;
  appUserName: string;
  email: string;
  photoImage?: any;
  utcOffset: number;
  isInternal: boolean;
  isActive: boolean;
  supervisorAppUserID: number;
  officeID: number;
  operationalRoleTypeID: number;
  genderTypeID: number;
  createdBy: string;
  updatedBy: string;
  dateCreatedUTC: string;
  lastUpdatedUTC: string;
  office?: any;
  operationalRole?: any;
  gender?: any;
}
