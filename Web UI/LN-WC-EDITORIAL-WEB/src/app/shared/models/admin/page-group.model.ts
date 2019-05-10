import { IPageGroup } from '../../interfaces/admin/page-group.interface';
import { ParentGroup } from './parent-group.model';
import { Page } from './page.model';

export class PageGroup implements IPageGroup {
  pagesGroupsID: number;
  parentGroupID: number;
  parentGroupName: string;
  pagesGroupsName: string;
  pagesGroupsDescription: string;
  sortOrder: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  page: Array<Page>;
  parentGroup: ParentGroup;
}
