import { IWorkUnitDuration } from '../../interfaces/admin/work-unit-duration.interface';
import { WorkUnitType } from './types/work-unit-type.model';

export class WorkUnitDuration implements IWorkUnitDuration {
  workLockDurationInMinID: number;
  workUnitTypeID: number;
  durationInMinutes: number;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  workUnitType: WorkUnitType;
}
