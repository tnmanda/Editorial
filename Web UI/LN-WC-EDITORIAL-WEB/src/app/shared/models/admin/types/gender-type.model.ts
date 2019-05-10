import { IGenderType } from '../../../interfaces/admin/types/gender-type.interface';

export class GenderType implements IGenderType {
  genderTypeID: number;
  genderTypeName: string;
  genderTypeAbbrev: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
