import { IAppUserEmploymentRecord } from '../../../interfaces/admin/app_user/app-user-employment-record.interface';
import { ContractType } from '../types/contract-type.model';
import { DepartureType } from '../types/departure-type.model';

export class AppUserEmploymentRecord implements IAppUserEmploymentRecord {
  appUserEmploymentRecordID: number;
  appUserID: number;
  startDateUTC: string;
  endDateUTC: string;
  contractTypeID: number;
  departureDateUTC: string;
  departureTypeID: number;
  isEligibleRehire: boolean;
  movedToProductionUTC: string;
  isReplaced: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  contractType: ContractType;
  departureType: DepartureType;
}
