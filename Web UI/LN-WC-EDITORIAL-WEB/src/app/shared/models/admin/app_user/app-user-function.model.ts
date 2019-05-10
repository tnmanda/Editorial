import { IAppUserFunction } from '../../../interfaces/admin/app_user/app-user-function.interface';
import { FunctionType } from '../types/function-type.model';

export class AppUserFunction implements IAppUserFunction {
  appUserFunctionID: number;
  appUserID: number;
  functionTypeID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  functionType: FunctionType;
}
