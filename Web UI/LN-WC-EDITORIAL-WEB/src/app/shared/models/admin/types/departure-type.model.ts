import { IDepartureType } from '../../../interfaces/admin/types/departure-type.interface';

export class DepartureType implements IDepartureType {
  departureTypeID: number;
  departureTypeName: string;
  departureTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
