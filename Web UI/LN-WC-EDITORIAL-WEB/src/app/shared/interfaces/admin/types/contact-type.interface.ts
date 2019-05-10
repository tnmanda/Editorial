export interface IContactType {
  contactTypeID: number;
  contactTypeDesc: string;
  contactTypeName: string;
  isInList: boolean;
  isActive: boolean;
  contactTypeGroup: number;
  sortOrder: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
