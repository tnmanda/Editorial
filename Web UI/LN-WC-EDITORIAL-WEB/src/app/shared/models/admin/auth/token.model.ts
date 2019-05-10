import { IToken } from '../../../interfaces/admin/auth/token.interface';

export class Token implements IToken {
  exp: Date;
  rol: Array<any>;
  'dmn_adm': Array<{'dname': string}> = [];
  'sub': string;
  'appuser_id': string;
  'given_name': string;
}
