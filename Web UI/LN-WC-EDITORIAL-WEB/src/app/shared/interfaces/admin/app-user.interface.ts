import { GenderType } from '../../models/admin/types/gender-type.model';
import { Office } from '../../models/admin/office.model';
import { AppUser } from '../../models/admin/app-user.model';
import { OperationalRoleType } from '../../models/admin/operational-role-type.model';

export interface IAppUser {
  appUserID: number;
  appUserName: string;
  email: string;
  photoImage: string;
  utcOffset: number;
  isInternal: boolean;
  isActive: boolean;
  supervisorAppUserID: number;
  officeID: number;
  officeName: string;
  operationalRoleTypeID: number;
  operationalRoleName: string;
  genderTypeID: number;
  genderName: string;
  roleTypeID: number;
  roleTypeName: string;
  createdBy: string;
  updatedBy: string;
  dateCreatedUTC: string;
  lastUpdatedUTC: string;

  gender: GenderType;
  office: Office;
  supervisorAppUser: AppUser;
  operationalRole: OperationalRoleType;
}
