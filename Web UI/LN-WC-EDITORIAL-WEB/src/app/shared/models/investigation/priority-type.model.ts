import { IPriorityType } from '../../interfaces/investigation/priority-type.interface';

export class PriorityType implements IPriorityType {
  priorityTypeID: number;
  priorityName: string;
  priorityDescription: string;
  priorityWeight: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
