export interface IAlertPastDue {
  alertJobQueueID: number;
  jobId: number;
  jobName: string;
  dueDate: string;
  dateCreated: string;
  source?: any;
}
