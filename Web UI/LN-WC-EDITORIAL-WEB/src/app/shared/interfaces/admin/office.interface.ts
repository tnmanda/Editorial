export interface IOffice {
  officeID: number;
  officeName: string;
  countryID: number;
  countryName: string;
  company: string;
  city: string;
  isSales: boolean;
  isResearch: boolean;
  isMarketing: boolean;
  isSupport: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
