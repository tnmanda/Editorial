export interface IAssignmentType {
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
