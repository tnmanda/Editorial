import { Page } from '../../models/admin/page.model';

export interface IPageInUserRole {
  pageInUserRoleID: number;
  pagesID: number;
  pageName: string;
  roleTypeID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  page: Page;
  pagesGroupsName: string;
  parentGroupName: string;
}
