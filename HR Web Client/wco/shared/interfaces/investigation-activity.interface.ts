export interface IInvestigationActivity {
  investigationID: number;
  activityTypeID: number;
  appUserID: number;
  fromValue: string;
  toValue: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
