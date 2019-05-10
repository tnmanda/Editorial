import { HrTokenData } from '../../../models/admin/auth/hr-token-data.model';
import { ApiTokenData } from '../../../models/admin/auth/api-token-data.model';

export interface IAuth {
  isAuthenticated: boolean;
  hrtokendata: HrTokenData;
  apitokendata: ApiTokenData;
}
