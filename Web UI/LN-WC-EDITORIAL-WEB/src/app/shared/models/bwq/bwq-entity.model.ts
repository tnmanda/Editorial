import { IBwqEntity } from '../../interfaces/bwq/bwq-entity.interface';

export class BwqEntity implements IBwqEntity {
  bwqEntitiesId: number;
  entityName: string;
  mmmEntityId: number;
  batchCount: number;
  batchName: string;
  priority: string;
  countryName: string;
  categoryName: string;
  startDateUTC: string;
  lockedBy: string;
  lockedAt: string;

  ent_ID: number;
  name: string;
  entryCategory: string;
  entrySubCategory: string;
  country: string;
}


export class BwqEntityHRToken {
  token: string;
  ModuleTableEntryID: number;
  ProfileId: number;
}

export class BwqEntityObject {
  workItemGuid: number;
  success: boolean;
  message: string;
}
