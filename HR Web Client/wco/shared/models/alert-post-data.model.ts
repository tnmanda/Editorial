import { AlertJobsQueueEntity } from './alert-jobs-queue-entity.model';
import { IAlertPostData } from '../interfaces/alert-post-data.interface';

export class AlertPostData implements IAlertPostData {
  AlertJobsQueueEntity: AlertJobsQueueEntity;
  HRToken: string;
}
