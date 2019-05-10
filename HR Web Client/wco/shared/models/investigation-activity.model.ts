import { IInvestigationActivity } from '../interfaces/investigation-activity.interface';

export class InvestigationActivity implements IInvestigationActivity {
  investigationID: number;
  activityTypeID: number;
  appUserID: number;
  fromValue: string;
  toValue: string;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  activityTypeName: string;
  appUserName: string;
}
