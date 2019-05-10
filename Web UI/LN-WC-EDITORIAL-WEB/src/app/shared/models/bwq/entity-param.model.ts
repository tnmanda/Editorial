import { IEntityParam } from '../../interfaces/bwq/entity-param.interface';
import { Country } from '../admin/country.model';
import { EntitySource } from './entity-source.model';
import { EntityCategory } from './entity-category.model';
import { EntitySubCategory } from './entity-sub-category.model';
import { EntityLevel } from './entity-level.model';

export class EntityParam implements IEntityParam {
  dateEnteredFrom?: string;
  dateEnteredTo?: string;
  dateUpdatedFrom?: string;
  dateUpdatedTo?: string;
  lastReviewedDateFrom?: string;
  lastReviewedDateTo?: string;
  enteredBy?: string;
  updatedBy?: string;
  reviewedBy?: string;
  dob?: boolean;
  doB2?: boolean;
  nationalID?: boolean;
  otherID?: boolean;
  passportID?: boolean;
  positions?: boolean;
  remarks?: string;
  entitiesSourceID?: number;
  countryID?: string;
  entryCategoryID?: number;
  entrySubCategoryID?: number;
  entitiesLevelsId?: number;

  country: Country[];
  source: EntitySource;
  category: EntityCategory;
  subCategory: EntitySubCategory;
  level: EntityLevel;
}
