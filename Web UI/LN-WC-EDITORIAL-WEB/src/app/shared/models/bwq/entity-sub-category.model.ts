import { IEntitySubCategory } from '../../interfaces/bwq/entity-sub-category.interface';

export class EntitySubCategory implements IEntitySubCategory {
  subCatID: number;
  subCatDesc: string;
  subCatDef: string;
  showOrder: number;
}
