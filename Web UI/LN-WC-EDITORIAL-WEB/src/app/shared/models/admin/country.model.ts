import { ICountry } from '../../interfaces/admin/country.interface';

export class Country implements ICountry {
  countryID: number;
  countryName: string;
  fileFolder?: any;
  countryAbbrev: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
