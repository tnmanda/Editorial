import { IAppUserCountry } from '../../../interfaces/admin/app_user/app-user-country.interface';
import { Country } from '../country.model';

export class AppUserCountry implements IAppUserCountry {
  appUserCountryID: number;
  appUserID: number;
  countryID: number;
  isLocked: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  country: Country;
}
