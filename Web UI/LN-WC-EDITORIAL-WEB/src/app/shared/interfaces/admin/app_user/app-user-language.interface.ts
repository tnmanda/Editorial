export interface IAppUserLanguage {
  appUserLanguageID: number;
  languageTypeID: number;
  appUserID: number;
  proficiencyTypeID: number;
  isMonitored: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
