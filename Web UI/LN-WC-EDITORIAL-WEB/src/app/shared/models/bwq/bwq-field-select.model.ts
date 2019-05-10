import { IBwqFieldSelect } from '../../interfaces/bwq/bwq-field-select.interface';

export class BwqFieldSelect implements IBwqFieldSelect {
  bwqFieldSelectID: number;
  fieldName: string;
  sourceTable: string;
  fieldDisplayName: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
