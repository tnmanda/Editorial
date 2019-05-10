import { Office } from './office.model';
import { LanguageType } from './types/language-type.model';
import { AppUser } from './app-user.model';
import { ITeam } from '../../interfaces/admin/team.interface';

export class Team implements ITeam {
  teamID: number;
  teamName: string;
  isActive: boolean;
  comments: string;
  isAlertsCoverage: boolean;
  isNewsCoverage: boolean;
  officeID: number;
  officeName: string;
  languageTypeID: number;
  languageTypeName: string;
  leadUserID: number;
  leadUserName: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  office: Office;
  languageType: LanguageType;
  leadUser: AppUser;
}
