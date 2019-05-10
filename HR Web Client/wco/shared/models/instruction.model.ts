import { BwqDispositions } from './bwq-dispositions.model';

export class Instruction {
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

export class BwqInstructionPostData {
  instructions: Instruction[];
  HRToken: string;
}
