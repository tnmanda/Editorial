export interface IAppUserTeamAssignment {
  appUserTeamAssignmentID: number;
  appUserID: number;
  teamID: number;
  assignmentTypeID: number;
  isDone: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
