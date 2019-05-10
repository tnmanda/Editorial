import { IPage } from '../../interfaces/admin/page.interface';
import { PageGroup } from './page-group.model';

export class Page implements IPage {
  pagesID: number;
  pageName: string;
  fullPath: string;
  pagesDescription: string;
  isActive: boolean;
  pagesGroupsID: number;
  pagesGroupsName: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  pagesGroups: PageGroup;
}
