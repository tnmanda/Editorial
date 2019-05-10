import { IEntitySource } from '../../interfaces/bwq/entity-source.interface';

export class EntitySource implements IEntitySource {
  sourceID: number;
  country: string;
  sourceName: string;
  sourceAbbrev: string;
  assignedTo: string;
  started: boolean;
  lastChecked: string;
  lastUpdated: string;
  articlesBased: string;
  comments: string;
  coverage: string;
  isRealSource: boolean;
  showOnList: boolean;
  isSpecialCollection: boolean;
  autoSelectOnFilter: boolean;
  fkSourceCategoryID: number;
  fkCountryID: number;
  isRedundantSource: boolean;
  frequency: string;
  accuitySource: boolean;
  fkTeamID: number;
  sourceCovered: string;
  reason: string;
  lastReviewedBy: string;
  lastReviewedDate: string;
}
