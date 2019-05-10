import { IDisposition } from '../../interfaces/investigation/disposition.interface';

export class Disposition implements IDisposition {
  investigationDispositionsID: number;
  dispositionType: string;
  dispositionDescription: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
