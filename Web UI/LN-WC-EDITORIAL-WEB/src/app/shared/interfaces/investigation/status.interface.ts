export interface IStatus {
  investigationStatusID: number;
  investigationStatusName: string;
  investigationStatusDescription: string;
  isDefault: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
