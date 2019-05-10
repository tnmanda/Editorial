import { IEntityCategory } from '../../interfaces/bwq/entity-category.interface';

export class EntityCategory implements IEntityCategory {
  id: number;
  entryCategory: string;
  entryCategoryDesc: string;
}
