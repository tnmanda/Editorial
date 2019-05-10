export interface ITeam {
  teamID: number;
  teamName: string;
  isActive: boolean;
  comments: string;
  isAlertsCoverage: boolean;
  isNewsCoverage: boolean;
  officeID: number;
  languageTypeID: number;
  leadUserID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
