import { IAddressType } from '../../../interfaces/admin/types/address-type.interface';

export class AddressType implements IAddressType {
  addressTypeID: number;
  addressTypeName: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
