import { IEducationType } from '../../../interfaces/admin/types/education-type.interface';

export class EducationType implements IEducationType {
  educationTypeID: number;
  educationName: string;
  educationDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
