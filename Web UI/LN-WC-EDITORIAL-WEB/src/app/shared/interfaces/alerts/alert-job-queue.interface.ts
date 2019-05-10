export interface IAlertJobQueue {
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
