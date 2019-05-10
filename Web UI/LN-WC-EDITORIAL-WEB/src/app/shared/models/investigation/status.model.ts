import { IStatus } from '../../interfaces/investigation/status.interface';

export class Status implements IStatus {
  investigationStatusID: number;
  investigationStatusName: string;
  investigationStatusDescription: string;
  isDefault: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
