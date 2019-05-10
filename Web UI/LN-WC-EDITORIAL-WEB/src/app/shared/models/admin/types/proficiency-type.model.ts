import { IProficiencyType } from '../../../interfaces/admin/types/proficiency-type.interface';

export class ProficiencyType implements IProficiencyType {
  proficiencyTypeID: number;
  proficiencyTypeName: string;
  proficiencyTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
