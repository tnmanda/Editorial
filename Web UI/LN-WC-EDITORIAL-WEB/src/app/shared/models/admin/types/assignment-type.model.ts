import { IAssignmentType } from '../../../interfaces/admin/types/assignment-type.interface';

export class AssignmentType implements IAssignmentType {
  assignmentTypeID: number;
  assignmentTypeName: string;
  assignmentDescription: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
