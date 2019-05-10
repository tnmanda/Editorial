import { IRoleType } from '../../../interfaces/admin/types/role-type.interface';

export class RoleType implements IRoleType {
  roleTypeID: number;
  roleTypeName: string;
  roleTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
