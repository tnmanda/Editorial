import { IInvestigationEntity } from '../../interfaces/investigation/investigation-entity.interface';

export class InvestigationEntity implements IInvestigationEntity {
  investigationID: number;
  investigationStatusName: string;
  fullName: string;
  priority: string;
  category: string;
  countryName: string;
  startDateUTC: string;
  lastActivityBy: string;
  lastActivityDate: string;
  lockedBy: string;
  lockedAt: string;
  dateCreatedUTC: string;
}

export class InvEntityHRToken {
  Token: string;
  ModuleTableEntryID: number;
  ProfileId: number;
}

export class InvEntityObject {
  workItemGuid: number;
  success: boolean;
  message: string;
}
