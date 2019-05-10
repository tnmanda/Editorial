import { IUserMap } from '../../interfaces/admin/user-map.interface';
import { AppUser } from './app-user.model';

export class UserMap implements IUserMap {
  hrEditorialUserMapID: number;
  appUserID: number;
  humanReviewUserID: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  appUser: AppUser;
}
