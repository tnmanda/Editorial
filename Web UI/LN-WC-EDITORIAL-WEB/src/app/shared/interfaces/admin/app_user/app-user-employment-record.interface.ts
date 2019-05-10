import { ContractType } from 'src/app/shared/models/admin/types/contract-type.model';
import { DepartureType } from 'src/app/shared/models/admin/types/departure-type.model';

export interface IAppUserEmploymentRecord {
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
