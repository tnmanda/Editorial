import { IAlertJobQueue } from '../../interfaces/alerts/alert-job-queue.interface';
import { AlertName } from './alert-name.model';
import { AlertJobs } from './alert-jobs.model';
import { CollectionItem } from '../bwq/collection-item.model';

export class AlertJobQueue implements IAlertJobQueue {
  alertJobsQueueID: number;
  description: string;
  jobName: string;
  status: string;
  created: string;
  due: string;
  priority: string;
  total: number;
  remaining: number;
}

export class AlertJobsQueueData {
  alertJobsID: number;
  statusCollectionItemID: number;
  priorityCollectionItemID: number;
  dueDateUTC: string;
  dateCreatedUTC: string;
  createdBy: string;
  lastUpdatedUTC: string;
  updatedBy: string;

  alertsJob: AlertJobs;
  status: CollectionItem;
  priority: CollectionItem;
}

export class AlertJobQueuePostData {
  alertJobsQueue: AlertJobsQueueData;
  alertNames: AlertName[];
  HRToken: string;
}

export class AlertJobsQueueEntityPostData {
  Token: string;
  ModuleTableEntryID: number;
  ProfileId: number;
  appuserid: number;
}

export class AlertJobsQueueEntityObject {
  workItemGuid: number;
  success: boolean;
  message: string;
}
