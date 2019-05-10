export interface IActivityType {
  activityTypeID: number;
  activityTypeName: string;
  activityTypeDescription: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
