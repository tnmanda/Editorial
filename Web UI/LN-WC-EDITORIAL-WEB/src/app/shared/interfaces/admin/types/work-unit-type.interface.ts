export interface IWorkUnitType {
  workUnitTypeID: number;
  workUnitTypeName: string;
  workUnitTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
