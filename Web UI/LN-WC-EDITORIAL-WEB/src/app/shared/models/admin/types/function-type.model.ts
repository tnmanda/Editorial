import { IFunctionType } from '../../../interfaces/admin/types/function-type.interface';

export class FunctionType implements IFunctionType {
  functionTypeID: number;
  functionTypeName: string;
  functionTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
