import { IContractType } from '../../../interfaces/admin/types/contract-type.interface';

export class ContractType implements IContractType {
  contractTypeID: number;
  contractTypeName: string;
  contractTypeDescr: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
