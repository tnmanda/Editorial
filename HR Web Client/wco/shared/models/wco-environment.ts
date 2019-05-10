export const api = {
  ln_wc_editorial_api_root: 'http://bgpc000032913:8084/api',
};

export const editorial = {
  editorial_web: 'http://localhost:4201'
};

export const wco_environment = {
  api_token: 'token',
  editorial_web: `${editorial.editorial_web}`,
  bwq_management: {
    root: `${api.ln_wc_editorial_api_root}/bwq/`,
    entity_by_workitemguid: `${api.ln_wc_editorial_api_root}/bwq/BWQEntities/guid/`,
    disposition: `${api.ln_wc_editorial_api_root}/bwq/BWQDispositions`,
    instruction: `${api.ln_wc_editorial_api_root}/bwq/BWQInstructions`,
  },
  investigation: {
    root: `${api.ln_wc_editorial_api_root}/investigation/`,
    entity_by_workitemguid: `${api.ln_wc_editorial_api_root}/investigation/guid/`,
    activity: `${api.ln_wc_editorial_api_root}/InvestigationActivity`,
    email: `${api.ln_wc_editorial_api_root}/Investigation/sendmail`,
    activity_type: {
      root: `${api.ln_wc_editorial_api_root}/ActivityType/`,
    },
    priority_type: {
      root: `${api.ln_wc_editorial_api_root}/PriorityType/`,
    },
    function_type: {
      root: `${api.ln_wc_editorial_api_root}/FunctionType/`,
    },
    disposition: {
      root: `${api.ln_wc_editorial_api_root}/InvestigationDispositions/`,
    },
    status: {
      root: `${api.ln_wc_editorial_api_root}/InvestigationStatus/`,
    },
    country: {
      root: `${api.ln_wc_editorial_api_root}/country/`,
    },
  },
  news: {
    root: `${api.ln_wc_editorial_api_root}/news/`,
    object_by_workitemguid: `${api.ln_wc_editorial_api_root}/news/guid/`,
    submit_feeditemqueue: `${api.ln_wc_editorial_api_root}/news/FeedItemQueue/`,
    lock: `${api.ln_wc_editorial_api_root}/news/lock/`,
    unlock: `${api.ln_wc_editorial_api_root}/news/unlock/`,
    status: {
      root:  `${api.ln_wc_editorial_api_root}/news/NewsStatus`,
    }
  },
  alerts: {
    root: `${api.ln_wc_editorial_api_root}/AlertJobsQueueEntity/`,
    object_by_workitemguid: `${api.ln_wc_editorial_api_root}/AlertJobsQueueEntity/guid/`,
    disposition: {
      root: `${api.ln_wc_editorial_api_root}/AlertJobsQueue/disposition`,
    },
    record_lock: {
      root: `${api.ln_wc_editorial_api_root}/RecordLocks/`,
    }
  }
};
