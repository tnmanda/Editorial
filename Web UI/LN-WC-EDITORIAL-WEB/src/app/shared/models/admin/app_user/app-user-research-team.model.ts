import { IAppUserResearchTeam } from '../../../interfaces/admin/app_user/app-user-research-team.interface';
import { Country } from '../country.model';
import { LanguageType } from '../types/language-type.model';
import { Office } from '../office.model';
import { Team } from '../team.model';
import { AppUser } from '../app-user.model';
import { WorkUnitType } from '../types/work-unit-type.model';

export class AppUserResearchTeam implements IAppUserResearchTeam {
  appUserResearchTeamID: number;
  workUnitTypeID: number;
  leadUserID: number;
  countryID: number;
  languageTypeID: number;
  officeID: number;
  teamID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  country: Country;
  languageType: LanguageType;
  workUnitType: WorkUnitType;
  office: Office;
  team: Team;
  leadUser: AppUser;
}
