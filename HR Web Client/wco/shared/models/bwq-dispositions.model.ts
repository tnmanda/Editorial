import { IBwqDispositions } from '../interfaces/bwq-dispositions.interface';

export class BwqDispositions implements IBwqDispositions {
  bwqDispositionsID: number;
  bwqDispositionsDescription: string;
  textDisplayed: string;
  sortOrder: number;
  isDefault: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
