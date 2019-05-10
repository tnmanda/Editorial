import { InvestigationDispositions } from '../models/investigation-dispositions.model';
import { PriorityType } from '../models/priority-type.model';
import { Country } from '../models/country.model';
import { FunctionType } from '../models/function-type.model';
import { InvestigationStatus } from '../models/investigation-status.model';

export interface IInvestigation {
  investigationID: number;
  priorityTypeID: number;
  countryID: number;
  functionTypeID: number;
  investigationDispositionsID?: any;
  investigationStatusID: number;
  entityName: string;
  countryOfRecord: string;
  dob: string;
  reason: string;
  otherInfo: string;
  comments: string;
  mmmddUsersID: number;
  createdByIP: string;
  isCanContactSubmitter: boolean;
  requestedBy: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
  priorityType: PriorityType;
  country: Country;
  functionType: FunctionType;
  investigationDispositions: InvestigationDispositions;
  investigationStatus: InvestigationStatus;
}
