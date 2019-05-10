import { Instruction } from '../models/instruction.model';
import { Entity } from '../models/entity.model';

export interface IBwqEntityObject {
  entity: Entity;
  instructions: Instruction[];
}
