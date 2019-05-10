import { IAlertObject } from '../interfaces/alert-object.interface';
import { AlertJobsQueueEntity } from './alert-jobs-queue-entity.model';
import { AlertNames } from './alert-names.model';
import { AlertJobs } from './alert-jobs.model';
import { AlertLockedTo } from './alert-locked-to.model';

export class AlertObject implements IAlertObject {
  alertJobsQueueEntity: AlertJobsQueueEntity;
  alertNames: AlertNames;
  alertJobs: AlertJobs;
  lockedTo: AlertLockedTo;
}
