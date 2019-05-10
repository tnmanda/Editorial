import { IPageInUserRole } from '../../interfaces/admin/page-in-user-role.interface';
import { Page } from './page.model';

export class PageInUserRole implements IPageInUserRole {
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
