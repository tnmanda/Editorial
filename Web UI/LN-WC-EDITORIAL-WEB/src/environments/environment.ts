import { IEnvironment } from './environment.interface';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const api = {
  ln_wc_editorial_api_root: 'http://bgpc000032913:8084/api',
};

export const hr = {
  human_review_web: 'http://localhost:4200',
  bwq_work_item_route: '/wco/bwq/workItemId/',
  inv_work_item_route: '/wco/investigation/workItemId/',
  alert_work_item_route: '/wco/alert/workItemId/',
  news_work_item_route: '/wco/news/workItemId/'
};

export const environment: IEnvironment = {
  production: false,
  name: 'LN WC Editorial',
  site_version: '1.0.0',
  api_token: 'token',
  hr_token: 'token',
  hr_web: `${hr.human_review_web}`,
  bwq_work_item_route: `${hr.bwq_work_item_route}`,
  inv_work_item_route: `${hr.inv_work_item_route}`,
  alert_work_item_route: `${hr.alert_work_item_route}`,
  news_work_item_route: `${hr.news_work_item_route}`,
  user_auth: `${api.ln_wc_editorial_api_root}/auth/apitoken`,
  app_user: {
    root: `${api.ln_wc_editorial_api_root}/user/`,
    detail: `${api.ln_wc_editorial_api_root}/user/disp`,
    noref: `${api.ln_wc_editorial_api_root}/user/noref`,
    absence: {
      root:  `${api.ln_wc_editorial_api_root}/AppUserAbsence/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserAbsence/user/`
    },
    address: {
      root: `${api.ln_wc_editorial_api_root}/AppUserAddress/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserAddress/user/`
    },
    certificate: {
      root: `${api.ln_wc_editorial_api_root}/AppUserCertificate/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserCertificate/user/`
    },
    contact: {
      root: `${api.ln_wc_editorial_api_root}/AppUserContact/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserContact/user/`
    },
    contract: {
      root: `${api.ln_wc_editorial_api_root}/AppUserContract/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserContract/user/`
    },
    country: {
      root: `${api.ln_wc_editorial_api_root}/AppUserCountry/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserCountry/user/`
    },
    education: {
      root: `${api.ln_wc_editorial_api_root}/AppUserEducation/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserEducation/user/`
    },
    employment_record: {
      root: `${api.ln_wc_editorial_api_root}/AppUserEmploymentRecord/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserEmploymentRecord/user/`
    },
    function: {
      root: `${api.ln_wc_editorial_api_root}/AppUserFunction/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserFunction/user/`
    },
    role: {
      root: `${api.ln_wc_editorial_api_root}/AppUserInRole/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserInRole/user/`
    },
    language: {
      root: `${api.ln_wc_editorial_api_root}/AppUserLanguage/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserLanguage/user/`
    },
    note: {
      root: `${api.ln_wc_editorial_api_root}/AppUserNote/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserNote/user/`
    },
    research_team: {
      root: `${api.ln_wc_editorial_api_root}/AppUserResearchTeam/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserResearchTeam/user/`
    },
    team: {
      root: `${api.ln_wc_editorial_api_root}/AppUserTeam/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserTeam/user/`
    },
    team_assignment: {
      root: `${api.ln_wc_editorial_api_root}/AppUserTeamAssignment/`,
      byAppUserId: `${api.ln_wc_editorial_api_root}/AppUserTeamAssignment/user/`
    }
  },
  office: {
    root: `${api.ln_wc_editorial_api_root}/office/`,
  },
  country: {
    root: `${api.ln_wc_editorial_api_root}/country/`,
  },
  team: {
    root: `${api.ln_wc_editorial_api_root}/team/`,
    noref: `${api.ln_wc_editorial_api_root}/team/noref`,
  },
  user_map: {
    root: `${api.ln_wc_editorial_api_root}/usermap/`,
  },
  page_management: {
    parent_group: {
      root: `${api.ln_wc_editorial_api_root}/parentgroup/`
    },
    page_group: {
      root: `${api.ln_wc_editorial_api_root}/pagesgroups/`
    },
    page: {
      root: `${api.ln_wc_editorial_api_root}/page/`,
      by_role_id: `${api.ln_wc_editorial_api_root}/page/role/`
    }
  },
  page_in_user_role: {
    root: `${api.ln_wc_editorial_api_root}/pageinuserrole/`,
    by_role_id: `${api.ln_wc_editorial_api_root}/pageinuserrole/role/`,
  },
  genderType: {
    root: `${api.ln_wc_editorial_api_root}/gender/`,
  },
  operationalRole: {
    root: `${api.ln_wc_editorial_api_root}/operationalrole/`,
  },
  absenceType: {
    root: `${api.ln_wc_editorial_api_root}/AbsenceType/`,
  },
  addressType: {
    root: `${api.ln_wc_editorial_api_root}/AddressType/`,
  },
  assignmentType: {
    root: `${api.ln_wc_editorial_api_root}/AssignmentType/`,
  },
  certificateType: {
    root: `${api.ln_wc_editorial_api_root}/CertificateType/`,
  },
  contactType: {
    root: `${api.ln_wc_editorial_api_root}/ContactType/`,
  },
  contractType: {
    root: `${api.ln_wc_editorial_api_root}/ContractType/`,
  },
  departureType: {
    root: `${api.ln_wc_editorial_api_root}/DepartureType/`,
  },
  educationType: {
    root: `${api.ln_wc_editorial_api_root}/Education/`,
  },
  functionType: {
    root: `${api.ln_wc_editorial_api_root}/FunctionType/`,
  },
  languageType: {
    root: `${api.ln_wc_editorial_api_root}/LanguageType/`,
  },
  proficiencyType: {
    root: `${api.ln_wc_editorial_api_root}/ProficiencyType/`,
  },
  roleType: {
    root: `${api.ln_wc_editorial_api_root}/RoleType/`,
  },
  workUnitType: {
    root: `${api.ln_wc_editorial_api_root}/WorkUnitType/`,
  },
  workUnitDuration: {
    root: `${api.ln_wc_editorial_api_root}/RecordLocks/Duration/`,
  },
  job_control: {
    alert_job: {
      root: `${api.ln_wc_editorial_api_root}/AlertJobs/`,
    },
    alert_source_type: {
      root: `${api.ln_wc_editorial_api_root}/AlertSourceType/`,
    },
    encoding: {
      root: `${api.ln_wc_editorial_api_root}/Encoding/`,
      by_name: `${api.ln_wc_editorial_api_root}/Encoding/name/`,
    }
  },
  single_sign_on: {
    root: `${api.ln_wc_editorial_api_root}/SSO/`,
  },
  bwq_management: {
    bwq: {
      root: `${api.ln_wc_editorial_api_root}/bwq/`,
      nav: `${api.ln_wc_editorial_api_root}/bwq/nav/`,
      filter: `${api.ln_wc_editorial_api_root}/bwq/BWQEntities/filter`,
      entity: `${api.ln_wc_editorial_api_root}/bwq/BWQEntities/wrkItem`
    },
    collection: {
      root: `${api.ln_wc_editorial_api_root}/collection/`,
    },
    collection_item: {
      root: `${api.ln_wc_editorial_api_root}/collectionitem/`,
      by_collection_id: `${api.ln_wc_editorial_api_root}/collectionitem/col/`
    },
    field_select: {
      root: `${api.ln_wc_editorial_api_root}/bwq/BWQFieldSelect/`,
    },
    instruction: {
      root: `${api.ln_wc_editorial_api_root}/bwq/BWQInstructions/`,
    },
    disposition: {
      root: `${api.ln_wc_editorial_api_root}/bwq//BWQDispositions/`,
    },
    entities: {
      root: `${api.ln_wc_editorial_api_root}/Entities/`,
      categories: `${api.ln_wc_editorial_api_root}/EntitiesCategories/`,
      sub_categories: `${api.ln_wc_editorial_api_root}/EntitiesSubCategories/`,
      sources: `${api.ln_wc_editorial_api_root}/EntitiesSources/`,
      levels: `${api.ln_wc_editorial_api_root}/EntitiesLevels/`,
    },
    record_lock: {
      root: `${api.ln_wc_editorial_api_root}/RecordLocks/`,
    }
  },
  investigation_management: {
    investigation: {
      root: `${api.ln_wc_editorial_api_root}/inv/`,
      nav: `${api.ln_wc_editorial_api_root}/Investigation/nav/`,
      filter: `${api.ln_wc_editorial_api_root}/Investigation/filter/`,
      entity: `${api.ln_wc_editorial_api_root}/Investigation/wrkItem/`
    },
    activity_type: {
      root: `${api.ln_wc_editorial_api_root}/ActivityType/`,
    },
    priority_type: {
      root: `${api.ln_wc_editorial_api_root}/PriorityType/`,
    },
    disposition: {
      root: `${api.ln_wc_editorial_api_root}/InvestigationDispositions/`,
    },
    status: {
      root: `${api.ln_wc_editorial_api_root}/InvestigationStatus/`,
    }
  },
  alerts_management: {
    alert_job: {
      root: `${api.ln_wc_editorial_api_root}/AlertJobs/`,
    },
    alert_job_queue: {
      root: `${api.ln_wc_editorial_api_root}/AlertJobsQueue/`,
      nav: `${api.ln_wc_editorial_api_root}/AlertJobsQueue/nav`,
      priorities: `${api.ln_wc_editorial_api_root}/AlertJobsQueue/priority`,
      status: `${api.ln_wc_editorial_api_root}/AlertJobsQueue/status`
    },
    alert_name: {
      root: `${api.ln_wc_editorial_api_root}/AlertNames/`,
      by_alert_job_id: `${api.ln_wc_editorial_api_root}/AlertNames/job/`,
    },
    alert_job_queue_entity: {
      nav: `${api.ln_wc_editorial_api_root}/AlertJobsQueueEntity/nav`,
      filter: `${api.ln_wc_editorial_api_root}/AlertJobsQueueEntity/filter`,
      wrkitem: `${api.ln_wc_editorial_api_root}/AlertJobsQueueEntity/wrkitem`,
    },
    reports: {
      past_due: `${api.ln_wc_editorial_api_root}/AlertJobs/pastdue`,
      inactive: `${api.ln_wc_editorial_api_root}/AlertJobs/inactive`,
    }
  },
  news_management: {
    news: {
      root: `${api.ln_wc_editorial_api_root}/News/`,
      nav: `${api.ln_wc_editorial_api_root}/News/nav/`,
      filter: `${api.ln_wc_editorial_api_root}/News/filter`,
      watch: `${api.ln_wc_editorial_api_root}/News/wrkitem`
    },
    watch_management: {
      root: `${api.ln_wc_editorial_api_root}/News/Feeder_watches/`,
      keyword: `${api.ln_wc_editorial_api_root}/News/Feeder_WatchKeywords/`,
      keyword_by_watchId: `${api.ln_wc_editorial_api_root}/News/Feeder_WatchKeywords/watch/`,
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
