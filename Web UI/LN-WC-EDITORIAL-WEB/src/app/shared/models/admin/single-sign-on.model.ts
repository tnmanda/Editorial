import { ISingleSignOn } from '../../interfaces/admin/single-sign-on.interface';

export class SingleSignOn implements ISingleSignOn {
  token: string;
  url: string;
  email: string;
}
