import { IAppUserInRole } from '../../../interfaces/admin/app_user/app-user-in-role.interface';
import { RoleType } from '../types/role-type.model';

export class AppUserInRole implements IAppUserInRole {
  appUserInRoleID: number;
  appUserID: number;
  roleTypeID: number;
  roleTypeName: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  roleType: RoleType;
}
