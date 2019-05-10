import { IInvestigationDispositions } from '../interfaces/investigation-dispositions.interface';

export class InvestigationDispositions implements IInvestigationDispositions {
  investigationDispositionsID: number;
  dispositionType: string;
  dispositionDescription: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
