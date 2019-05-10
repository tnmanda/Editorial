export interface IAlertJobsQueueEntity {
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
