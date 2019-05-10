export interface INewsLockedTo {
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
