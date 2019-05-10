import { IAppUserLanguage } from '../../../interfaces/admin/app_user/app-user-language.interface';
import { LanguageType } from '../types/language-type.model';
import { ProficiencyType } from '../types/proficiency-type.model';

export class AppUserLanguage implements IAppUserLanguage {
  appUserLanguageID: number;
  languageTypeID: number;
  appUserID: number;
  proficiencyTypeID: number;
  isMonitored: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  languageType: LanguageType;
  proficiencyType: ProficiencyType;
}
