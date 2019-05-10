import { BwqEntity } from './bwq-entity.model';
import { IBwqInstruction } from '../../interfaces/bwq/bwq-instruction.interface';
import { BwqDisposition } from './bwq-disposition.model';
import { BwqFieldSelect } from './bwq-field-select.model';

export class BwqInstruction implements IBwqInstruction {
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
  bwqDispositions: BwqDisposition;
  bwqFieldSelect: BwqFieldSelect;

  bwqInstructionFakeGUID: string;
}
