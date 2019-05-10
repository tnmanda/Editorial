import { IAuth } from '../../../interfaces/admin/auth/auth.interface';
import { HrTokenData } from './hr-token-data.model';
import { ApiTokenData } from './api-token-data.model';

export class Auth implements IAuth {
  isAuthenticated: boolean;
  hrtokendata: HrTokenData;
  apitokendata: ApiTokenData;
}

