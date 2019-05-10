export interface IPage {
  pagesID: number;
  pageName: string;
  fullPath: string;
  pagesDescription: string;
  isActive: boolean;
  pagesGroupsID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
