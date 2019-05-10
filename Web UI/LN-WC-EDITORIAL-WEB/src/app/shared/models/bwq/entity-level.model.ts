import { IEntityLevel } from '../../interfaces/bwq/entity-level.interface';

export class EntityLevel implements IEntityLevel {
  levelID: number;
  levelDesc: string;
  highLevel: boolean;
}
