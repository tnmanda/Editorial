import { IEncoding } from 'src/app/shared/interfaces/admin/job-control/encoding.interface';

export class Encoding implements IEncoding {
  encodingID: number;
  encodingName: string;
  description: string;
  isActive: boolean;
  isHighPriority: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
