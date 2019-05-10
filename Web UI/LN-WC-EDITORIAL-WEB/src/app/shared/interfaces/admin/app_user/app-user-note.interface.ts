export interface IAppUserNote {
  appUserNoteID: number;
  appUserID: number;
  notes: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
