export interface IAppUserAbsence {
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
}
