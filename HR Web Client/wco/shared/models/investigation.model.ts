import { IInvestigation } from '../interfaces/investigation.interface';
import { PriorityType } from './priority-type.model';
import { Country } from './country.model';
import { FunctionType } from './function-type.model';
import { InvestigationDispositions } from './investigation-dispositions.model';
import { InvestigationStatus } from './investigation-status.model';
import { InvestigationNote } from './investigation-note.model';

export class Investigation implements IInvestigation {
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

export class InvestigationPostData {
  investigation: Investigation;
  HRToken: string;
  InvestigationNote: InvestigationNote;
}
