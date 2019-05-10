import { IAlertJobsQueueEntity } from '../interfaces/alert-jobs-queue-entity.interface';

export class AlertJobsQueueEntity implements IAlertJobsQueueEntity {
  alertJobsQueueEntityID: number;
  alertJobsQueueID: number;
  alertNameID: number;
  statusID: number;
  workItemID: string;
  dateCreatedUTC: string;
  createdBy: string;
  lastUpdatedUTC: string;
  updatedBy: string;
}

