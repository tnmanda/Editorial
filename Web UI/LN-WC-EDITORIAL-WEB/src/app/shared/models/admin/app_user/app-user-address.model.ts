import { IAppUserAddress } from '../../../interfaces/admin/app_user/app-user-address.interface';
import { Country } from '../country.model';
import { AddressType } from '../types/address-type.model';

export class AppUserAddress implements IAppUserAddress {
  appUserAddressID: number;
  addressTypeID: number;
  appUserID: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  provinceStateRegion: string;
  countryID: number;
  postalCode: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  country: Country;
  addressType: AddressType;
}
