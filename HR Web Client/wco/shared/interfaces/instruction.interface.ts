import { BwqDispositions } from '../models/bwq-dispositions.model';

export interface IInstruction {
  bwqInstructionsID: number;
  bwqDispositionsID: number;
  bwqEntitiesID: number;
  bwqFieldSelectID: number;
  bwqDispositions: BwqDispositions;
  instructions: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
  batchName: string;
  workItemId: string;
  item: string;
}
