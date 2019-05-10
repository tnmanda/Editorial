import { GenderType } from './types/gender-type.model';
import { Office } from './office.model';
import { OperationalRoleType } from './operational-role-type.model';
import { IAppUser } from '../../interfaces/admin/app-user.interface';

export class AppUser implements IAppUser {
  appUserID: number;
  appUserName: string;
  email: string;
  photoImage: string;
  utcOffset: number;
  isInternal: boolean;
  isActive: boolean;
  supervisorAppUserID: number;
  supervisorName: string;
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
