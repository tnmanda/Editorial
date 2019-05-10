import { IAbsenceType } from '../../../interfaces/admin/types/absence-type.interface';

export class AbsenceType implements IAbsenceType {
  absenceTypeID: number;
  absenceTypeName: string;
  absenceTypeValue: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
