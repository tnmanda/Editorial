import { Entity } from './entity.model';
import { Instruction } from './instruction.model';
import { IBwqEntityObject } from '../interfaces/bwq-entity-object.interface';

export class BwqEntityObject implements IBwqEntityObject {
  entity: Entity;
  instructions: Instruction[];
}
