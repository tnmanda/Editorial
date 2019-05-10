export interface IInvestigationStatus {
  investigationStatusID: number;
  investigationStatusName: string;
  investigationStatusDescription: string;
  isDefault: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
