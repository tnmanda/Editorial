import { IInvestigationNote } from '../interfaces/investigation-note.interface';

export class InvestigationNote implements IInvestigationNote {
  investigationID: number;
  noteText: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  note: string;
  dateCreated: string;
}
