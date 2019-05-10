import { IWorkUnitType } from '../../../interfaces/admin/types/work-unit-type.interface';

export class WorkUnitType implements IWorkUnitType {
  workUnitTypeID: number;
  workUnitTypeName: string;
  workUnitTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
