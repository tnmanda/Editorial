import { IAppUserNote } from '../../../interfaces/admin/app_user/app-user-note.interface';

export class AppUserNote implements IAppUserNote {
  appUserNoteID: number;
  appUserID: number;
  notes: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
