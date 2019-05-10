import { IInvestigationStatus } from '../interfaces/investigation-status.interface';

export class InvestigationStatus implements IInvestigationStatus {
  investigationStatusID: number;
  investigationStatusName: string;
  investigationStatusDescription: string;
  isDefault: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
