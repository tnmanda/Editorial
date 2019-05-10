import { IAppUserContact } from '../../../interfaces/admin/app_user/app-user-contact.interface';
import { ContactType } from '../types/contact-type.model';

export class AppUserContact implements IAppUserContact {
  appUserContactID: number;
  appUserID: number;
  contactTypeID: number;
  contactTypeValue: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  contactType: ContactType;
}
