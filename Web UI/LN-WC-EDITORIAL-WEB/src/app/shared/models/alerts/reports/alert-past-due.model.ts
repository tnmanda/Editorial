import { IAlertPastDue } from 'src/app/shared/interfaces/alerts/reports/alert-past-due.interface';

export class AlertPastDue implements IAlertPastDue {
  alertJobQueueID: number;
  jobId: number;
  jobName: string;
  dueDate: string;
  dateCreated: string;
  source?: any;
}
