export interface IToken {
  exp: Date;
  rol: Array<any>;
  'dmn_adm': Array<{'dname': string}>;
  'sub': string;
  'appuser_id': string;
  'given_name': string;
}
