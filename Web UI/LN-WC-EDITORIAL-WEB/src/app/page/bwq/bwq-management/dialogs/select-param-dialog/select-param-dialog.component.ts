import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityService } from '../../../../../shared/services/bwq/entity.service';
import { environment } from '../../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { EntityCategory } from '../../../../../shared/models/bwq/entity-category.model';
import { EntitySubCategory } from '../../../../../shared/models/bwq/entity-sub-category.model';
import { EntitySource } from '../../../../../shared/models/bwq/entity-source.model';
import { EntityLevel } from '../../../../../shared/models/bwq/entity-level.model';
import { CountryService } from '../../../../../shared/services/admin/country.service';
import { Country } from '../../../../../shared/models/admin/country.model';
import { EntityParam } from '../../../../../shared/models/bwq/entity-param.model';
import { AppUserService } from '../../../../../shared/services/admin/app-user.service';
import { AppUser } from '../../../../../shared/models/admin/app-user.model';
import { BwqEntity } from '../../../../../shared/models/bwq/bwq-entity.model';
import { Dropdown } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';

@Component({
  selector: 'app-select-param-dialog',
  templateUrl: './select-param-dialog.component.html',
  styleUrls: ['./select-param-dialog.component.css']
})
export class SelectParamDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  @Output() outgoingData = new EventEmitter<BwqEntity[]>();

  isSubmitted = false;

  selectParamForm: FormGroup;

  entityParam: EntityParam;
  bwqEntities: BwqEntity[];
  bwqEntitiesCount = 0;

  countryAllSubscription: Subscription;
  categoryAllSubscription: Subscription;
  subCategoryAllSubscription: Subscription;
  sourceAllSubscription: Subscription;
  levelAllSubscription: Subscription;
  appUserAllSubscription: Subscription;
  entitySubscription: Subscription;

  categories: EntityCategory[];
  subCategories: EntitySubCategory[];
  sources: EntitySource[];
  levels: EntityLevel[];
  countries: Country[];
  appUsers: AppUser[];

  // convenience getter for easy access to form fields
  // get f() { return this.officeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private countrySrv: CountryService,
              private appUserSrv: AppUserService,
              private entitySrv: EntityService) { }

  ngOnInit() {
    this.getCategories();
    this.getSubCategories();
    this.getLevels();
    this.getCountries();
    this.getSources();
    // this.getAppUsers();
  }

  ngOnChanges() {
    this.genSelectParmForm();
  }

  genSelectParmForm() {
    this.selectParamForm = new FormGroup ({
      'dateEnteredFrom' : new FormControl(''),
      'dateEnteredTo' : new FormControl(''),
      'dateUpdatedFrom' : new FormControl(''),
      'dateUpdatedTo' : new FormControl(''),
      'lastReviewedDateFrom' : new FormControl(''),
      'lastReviewedDateTo' : new FormControl(''),
      'enteredBy' : new FormControl(''),
      'updatedBy' : new FormControl(''),
      'reviewedBy' : new FormControl(''),
      'dob' : new FormControl(false),
      'nationalID' : new FormControl(false),
      'passportID' : new FormControl(false),
      'doB2' : new FormControl(false),
      'otherID' : new FormControl(false),
      'country' : new FormControl(''),
      'category' : new FormControl(''),
      'subCategory' : new FormControl(''),
      'source' : new FormControl(''),
      'level' : new FormControl(''),
      'positions' : new FormControl(''),
      'remarks' : new FormControl('')
    });
  }

  getAppUsers() {
    this.appUserSrv.apiUrl = environment.app_user.root;
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
      this.countries = items;
    });
  }

  getSources() {
    this.entitySrv.apiUrl = environment.bwq_management.entities.sources;
    this.categoryAllSubscription = this.entitySrv.getSources().subscribe((items: Array<EntitySource>) => {
      this.sources = items;
    });
  }

  getCategories() {
    this.entitySrv.apiUrl = environment.bwq_management.entities.categories;
    this.categoryAllSubscription = this.entitySrv.getCategories().subscribe((items: Array<EntityCategory>) => {
      this.categories = items;
    });
  }

  getSubCategories() {
    this.entitySrv.apiUrl = environment.bwq_management.entities.sub_categories;
    this.subCategoryAllSubscription = this.entitySrv.getSubCategories().subscribe((items: Array<EntitySubCategory>) => {
      this.subCategories = items;
    });
  }

  getLevels() {
    this.entitySrv.apiUrl = environment.bwq_management.entities.levels;
    this.levelAllSubscription = this.entitySrv.getLevels().subscribe((items: Array<EntityLevel>) => {
      this.levels = items;
    });
  }

  onSave(selectParamForm) {
    if (selectParamForm.valid) {
      this.isSubmitted = true;
      this.entityParam = selectParamForm.value;

      this.entityParam.dateEnteredFrom = (this.entityParam.dateEnteredFrom) ?
      this.globalHelperSrv.localToUtc(new Date(this.entityParam.dateEnteredFrom)).toUTCString() : null;
      this.entityParam.dateEnteredTo = (this.entityParam.dateEnteredTo) ?
      this.globalHelperSrv.localToUtc(new Date(this.entityParam.dateEnteredTo)).toUTCString() : null;
      this.entityParam.dateUpdatedFrom = (this.entityParam.dateUpdatedFrom) ?
      this.globalHelperSrv.localToUtc(new Date(this.entityParam.dateUpdatedFrom)).toUTCString() : null;
      this.entityParam.dateUpdatedTo = (this.entityParam.dateUpdatedTo) ?
      this.globalHelperSrv.localToUtc(new Date(this.entityParam.dateUpdatedTo)).toUTCString() : null;
      this.entityParam.lastReviewedDateFrom = (this.entityParam.lastReviewedDateFrom) ?
      this.globalHelperSrv.localToUtc(new Date(this.entityParam.lastReviewedDateFrom)).toUTCString() : null;
      this.entityParam.lastReviewedDateTo = (this.entityParam.lastReviewedDateTo) ?
      this.globalHelperSrv.localToUtc(new Date(this.entityParam.lastReviewedDateTo)).toUTCString() : null;

       this.entityParam.countryID = '';
       if (this.entityParam.country !== null) {
         for (const c of this.entityParam.country) {
           if (c === this.entityParam.country[this.entityParam.country.length - 1]) {
             this.entityParam.countryID = this.entityParam.countryID + c.countryID.toString();
           } else {
             this.entityParam.countryID = this.entityParam.countryID + c.countryID.toString() + '-';
           }
         }
       }

      this.entityParam.entitiesSourceID = (this.entityParam.source) ? this.entityParam.source.sourceID : null;
      this.entityParam.entryCategoryID = (this.entityParam.category) ? this.entityParam.category.id : null;
      this.entityParam.entrySubCategoryID = (this.entityParam.subCategory) ? this.entityParam.subCategory.subCatID : null;
      this.entityParam.entitiesLevelsId = (this.entityParam.level) ? this.entityParam.level.levelID : null;
      this.entityParam.country = null;

      this.entitySrv.apiUrl = environment.bwq_management.entities.root;
      this.entitySubscription = this.entitySrv.getEntities(this.entityParam).subscribe((items: Array<BwqEntity>) => {
          this.bwqEntities = items;
          this.bwqEntitiesCount = this.bwqEntities.length;
          this.isSubmitted = false;
      });
    }
  }

  onSubmit() {
    this.outgoingData.emit(this.bwqEntities);
    this.onClose();
  }

  onClose() {
    this.displayChange.emit(false);
    this.isSubmitted = false;
    this.clearData();
  }

  clearData() {
    this.bwqEntities = null;
    this.bwqEntitiesCount = 0;
    this.selectParamForm.reset();
  }

  ngOnDestroy() {
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
    if (this.categoryAllSubscription) { this.categoryAllSubscription.unsubscribe(); }
    if (this.subCategoryAllSubscription) { this.subCategoryAllSubscription.unsubscribe(); }
    if (this.sourceAllSubscription) { this.sourceAllSubscription.unsubscribe(); }
    if (this.levelAllSubscription) { this.levelAllSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
    if (this.entitySubscription) { this.entitySubscription.unsubscribe(); }
  }

}
