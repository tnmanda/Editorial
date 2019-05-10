import { IAlertJobs } from '../interfaces/alert-jobs.interface';

export class AlertJobs implements IAlertJobs {
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
}
