import { IAppUserContract } from '../../../interfaces/admin/app_user/app-user-contract.interface';
import { ContractType } from '../types/contract-type.model';

export class AppUserContract implements IAppUserContract {
  appUserContractID: number;
  appUserID: number;
  terminationDateUTC: string;
  movedToProductionUTC: string;
  startDateUTC: string;
  contractTypeID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  contractType: ContractType;
}
