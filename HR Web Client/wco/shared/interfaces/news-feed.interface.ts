export interface INewsFeed {
  pkFeedID: number;
  feedName: string;
  feedURL: string;
  active: boolean;
  fkLanguageID: number;
  fkCountryID: number;
  city: string;
  fkAddedBy: number;
  fkUpdatedBy: number;
  dateAdded: string;
  dateUpdated: string;
  fkWorkerID?: any;
  currentState?: any;
  nextRunTime?: any;
}
