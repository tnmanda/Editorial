export interface IEntityParam {
  dateEnteredFrom?: string;
  dateEnteredTo?: string;
  dateUpdatedFrom?: string;
  dateUpdatedTo?: string;
  lastReviewedDateFrom?: string;
  lastReviewedDateTo?: string;
  enteredBy?: string;
  updatedBy?: string;
  reviewedBy?: string;
  dob?: boolean;
  doB2?: boolean;
  nationalID?: boolean;
  otherID?: boolean;
  passportID?: boolean;
  positions?: boolean;
  remarks?: string;
  entitiesSourceID?: number;
  countryID?: string;
  entryCategoryID?: number;
  entrySubCategoryID?: number;
  entitiesLevelsId?: number;
}
