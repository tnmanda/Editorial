export interface IAppUserContract {
  appUserContractID: number;
  appUserID: number;
  terminationDateUTC: string;
  movedToProductionUTC: string;
  startDateUTC: string;
  contractTypeID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
