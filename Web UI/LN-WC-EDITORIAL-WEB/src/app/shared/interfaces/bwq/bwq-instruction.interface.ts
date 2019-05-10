import { BwqEntity } from '../../models/bwq/bwq-entity.model';

export interface IBwqInstruction {
  bwqInstructionsID: number;
  bwqEntitiesID: number;
  bwqDispositionsID: number;
  bwqFieldSelectID: number;
  instructions: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
  bwqEntities:  BwqEntity;
  bwqDispositions: any;
  bwqFieldSelect?: any;
}
