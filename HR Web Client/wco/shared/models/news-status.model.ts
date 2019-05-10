import { INewsStatus } from '../interfaces/news-status.interface';

export class NewsStatus implements INewsStatus {
  newsStatusID: number;
  newsStatusValue: number;
  newsStatusDescription: string;
  newsState: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
