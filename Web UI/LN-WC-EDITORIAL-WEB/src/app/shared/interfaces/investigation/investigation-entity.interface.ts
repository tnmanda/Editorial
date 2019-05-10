export interface IInvestigationEntity {
  investigationID: number;
  investigationStatusName: string;
  fullName: string;
  priority: string;
  category: string;
  countryName: string;
  startDateUTC: string;
  lastActivityBy: string;
  lastActivityDate: string;
  lockedBy: string;
  lockedAt: string;
  dateCreatedUTC: string;
}
