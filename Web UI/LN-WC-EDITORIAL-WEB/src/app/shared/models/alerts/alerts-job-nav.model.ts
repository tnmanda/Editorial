export class AlertsJobNav {
  label: string;
  children: Child[];
}

class Child {
  label: string;
  data: AlertJobEntityData;
}

export class AlertJobEntityData {
  due: string;
  alertJobQueueID: number;
  job: string;

  dueDate: string;
}
