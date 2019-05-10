import { ParentGroup } from '../../models/admin/parent-group.model';

export interface IPageGroup {
  pagesGroupsID: number;
  parentGroupID: number;
  pagesGroupsName: string;
  pagesGroupsDescription: string;
  sortOrder: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  parentGroup: ParentGroup;
}
