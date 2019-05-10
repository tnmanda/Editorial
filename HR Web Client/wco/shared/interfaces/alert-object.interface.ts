import { AlertJobsQueueEntity } from '../models/alert-jobs-queue-entity.model';
import { AlertNames } from '../models/alert-names.model';
import { AlertJobs } from '../models/alert-jobs.model';
import { AlertLockedTo } from '../models/alert-locked-to.model';

export interface IAlertObject {
  alertJobsQueueEntity: AlertJobsQueueEntity;
  alertNames: AlertNames;
  alertJobs: AlertJobs;
  lockedTo: AlertLockedTo;
}
