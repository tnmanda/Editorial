import { ILanguageType } from '../../../interfaces/admin/types/language-type.interface';

export class LanguageType implements ILanguageType {
  languageTypeID: number;
  languageTypeName: string;
  languageTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
