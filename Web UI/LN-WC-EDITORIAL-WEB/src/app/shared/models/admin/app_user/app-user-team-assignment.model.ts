import { IAppUserTeamAssignment } from '../../../interfaces/admin/app_user/app-user-team-assignment.interface';
import { Team } from '../team.model';
import { AssignmentType } from '../types/assignment-type.model';

export class AppUserTeamAssignment implements IAppUserTeamAssignment {
  appUserTeamAssignmentID: number;
  appUserID: number;
  teamID: number;
  assignmentTypeID: number;
  isDone: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  team: Team;
  assignmentType: AssignmentType;
}
