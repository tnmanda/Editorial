import { IAppUserEducation } from '../../../interfaces/admin/app_user/app-user-education.interface';
import { EducationType } from '../types/education-type.model';

export class AppUserEducation implements IAppUserEducation {
  appUserEducationID: number;
  appUserID: number;
  educationTypeID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  educationType: EducationType;
}
