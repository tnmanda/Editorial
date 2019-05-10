import { Country } from '../country.model';
import { IAlertJob } from 'src/app/shared/interfaces/admin/job-control/alert-job.interface';
import { Team } from '../team.model';
import { AlertSourceType } from './alert-source-type.model';
import { Encoding } from './encoding.model';

export class AlertJob implements IAlertJob {
  alertJobsID: number;
  jobName: string;
  jobAbbrev: string;
  jobDescription: string;
  jobURL: string;
  isActive: boolean;
  jobSpecialInstructions: string;
  jobComments: string;
  alertSourceTypeID: number;
  countryID: number;
  jobScrapperClassName: string;
  jobScrapperAssemble: string;
  isWithLookUpID: boolean;
  tableNameSource: string;
  isShowOnDynamicDisplay: boolean;
  regex: string;
  regexForPages: string;
  encoding?: any;
  encodingID: number;
  isPreventDeletions: boolean;
  isUserTermsFilter: boolean;
  isSendNoUpdate: boolean;
  teamID: number;
  priorityCode: number;
  isUseProxy: boolean;
  isCriticalJob: boolean;
  resultType?: any;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  country: Country;
  team: Team;
  alertSourceType: AlertSourceType;
  // encoding: Encoding;
}
