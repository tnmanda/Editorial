export interface IEnvironment {
  production: boolean;
  name: string;
  site_version: string;
  api_token: string;
  hr_token: string;
  hr_web: string;
  bwq_work_item_route: string;
  inv_work_item_route: string;
  alert_work_item_route: string;
  news_work_item_route: string;
  user_auth: string;
  app_user: {
    root: string,
    detail: string,
    noref: string,
    absence: {
      root: string,
      byAppUserId: string
    },
    address: {
      root: string,
      byAppUserId: string
    },
    certificate: {
      root: string,
      byAppUserId: string
    },
    contact: {
      root: string,
      byAppUserId: string
    },
    contract: {
      root: string,
      byAppUserId: string
    },
    country: {
      root: string,
      byAppUserId: string
    },
    education: {
      root: string,
      byAppUserId: string
    },
    employment_record: {
      root: string,
      byAppUserId: string
    },
    function: {
      root: string,
      byAppUserId: string
    },
    role: {
      root: string,
      byAppUserId: string
    },
    language: {
      root: string,
      byAppUserId: string
    },
    note: {
      root: string,
      byAppUserId: string
    },
    research_team: {
      root: string,
      byAppUserId: string
    },
    team: {
      root: string,
      byAppUserId: string
    },
    team_assignment: {
      root: string,
      byAppUserId: string
    }
  };
  office: {
    root: string
  };
  country: {
    root: string
  };
  team: {
    root: string,
    noref: string
  };
  user_map: {
    root: string
  };
  page_management: {
    parent_group: {
      root: string
    },
    page_group: {
      root: string
    },
    page: {
      root: string,
      by_role_id: string,
    }
  };
  page_in_user_role: {
    root: string,
    by_role_id: string,
  };
  genderType: {
    root: string
  };
  operationalRole: {
    root: string
  };
  absenceType: {
    root: string
  };
  addressType: {
    root: string
  };
  assignmentType: {
    root: string
  };
  certificateType: {
    root: string
  };
  contactType: {
    root: string
  };
  contractType: {
    root: string
  };
  departureType: {
    root: string
  };
  educationType: {
    root: string
  };
  functionType: {
    root: string
  };
  languageType: {
    root: string
  };
  proficiencyType: {
    root: string
  };
  roleType: {
    root: string,
  };
  workUnitType: {
    root: string
  };
  workUnitDuration: {
    root: string
  };
  job_control: {
    alert_job: {
      root: string
    },
    alert_source_type: {
      root: string
    },
    encoding: {
      root: string,
      by_name: string
    }
  };
  single_sign_on: {
    root: string
  };
  bwq_management: {
    bwq: {
      root: string,
      nav: string,
      filter: string,
      entity: string
    },
    collection: {
      root: string
    },
    collection_item: {
      root: string,
      by_collection_id: string
    },
    field_select: {
      root: string
    },
    instruction: {
      root: string
    },
    disposition: {
      root: string
    },
    entities: {
      root: string,
      categories: string,
      sub_categories: string,
      sources: string,
      levels: string
    },
    record_lock: {
      root: string
    }
  };
  investigation_management: {
    investigation: {
      root: string,
      nav: string,
      filter: string,
      entity: string
    },
    activity_type: {
      root: string
    },
    priority_type: {
      root: string
    },
    disposition: {
      root: string
    },
    status: {
      root: string
    }
  };
  alerts_management: {
    alert_job: {
      root: string
    },
    alert_job_queue: {
      root: string,
      nav: string,
      priorities: string,
      status: string
    },
    alert_name: {
      root: string,
      by_alert_job_id: string
    },
    alert_job_queue_entity: {
      nav: string,
      filter: string,
      wrkitem: string
    },
    reports: {
      past_due: string,
      inactive: string,
    }
  };
  news_management: {
    news: {
      root: string,
      nav: string,
      filter: string,
      watch: string
    },
    watch_management: {
      root: string,
      keyword: string
      keyword_by_watchId: string
    }
  };
}
