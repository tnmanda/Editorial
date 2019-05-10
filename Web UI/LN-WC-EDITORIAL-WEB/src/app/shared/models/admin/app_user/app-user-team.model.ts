import { IAppUserTeam } from '../../../interfaces/admin/app_user/app-user-team.interface';
import { Team } from '../team.model';

export class AppUserTeam implements IAppUserTeam {
  appUserTeamID: number;
  teamID: number;
  appUserID: number;
  comments: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  team: Team;
}
