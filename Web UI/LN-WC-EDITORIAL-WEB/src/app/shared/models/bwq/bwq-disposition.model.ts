import { IBwqDisposition } from '../../interfaces/bwq/bwq-disposition.interface';

export class BwqDisposition implements IBwqDisposition {
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
