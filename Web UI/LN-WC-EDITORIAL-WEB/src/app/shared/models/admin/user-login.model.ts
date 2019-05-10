import { IUserLogin } from '../../interfaces/admin/user-login.interface';

export class UserLogin implements IUserLogin {
  domain: string;
  userName: string;
  password: string;
  groupcode: string;
}
