export interface IWorkUnitDuration {
  workLockDurationInMinID: number;
  workUnitTypeID: number;
  durationInMinutes: number;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
