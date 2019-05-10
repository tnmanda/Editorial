import { IAlertJobsQueueEntity } from '../../interfaces/alerts/alert-jobs-queue-entity.interface';

export class AlertJobsQueueEntity implements IAlertJobsQueueEntity {
  alertJobsQueueID: number;
  job: string;
  due: string;
  alert: string;
  alertDescription: string;
  created: string;
  alertJobEntityID: number;
  workItemID: string;
  status: string;
  locked?: any;
}
