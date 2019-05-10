export interface IAlertJob {
  pkJobID: number;
  jobName: string;
  jobUrl: string;
  openJobCount: number;
  alertNameID: number;
  fkCountryID: number;
  country: string;
  nameEntry: string;
  editTypeID: number;
  dispositionTypeID: number;
  fkRecipientID: number;
  dispositionUser: string;
  emailPoolDateCreated: string;
  emailKey: string;
  emailKeyNext: string;
  completed: boolean;

  googleUrl: string;
}
