import { AlertJobsQueueEntity } from '../models/alert-jobs-queue-entity.model';

export interface IAlertPostData {
  AlertJobsQueueEntity: AlertJobsQueueEntity;
  HRToken: string;
}
