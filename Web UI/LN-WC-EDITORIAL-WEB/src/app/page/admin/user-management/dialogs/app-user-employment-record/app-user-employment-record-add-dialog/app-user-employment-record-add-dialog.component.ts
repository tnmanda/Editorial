import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserEmploymentRecord } from 'src/app/shared/models/admin/app_user/app-user-employment-record.model';
import { Subscription } from 'rxjs';
import { ContractType } from 'src/app/shared/models/admin/types/contract-type.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DepartureType } from 'src/app/shared/models/admin/types/departure-type.model';
import { AppUserEmploymentRecordService } from 'src/app/shared/services/admin/app_user/app-user-employment-record.service';
import { ContractTypeService } from 'src/app/shared/services/admin/types/contract-type.service';
import { DepartureTypeService } from 'src/app/shared/services/admin/types/departure-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-employment-record-add-dialog',
  templateUrl: './app-user-employment-record-add-dialog.component.html',
  styleUrls: ['./app-user-employment-record-add-dialog.component.css']
})
export class AppUserEmploymentRecordAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserEmploymentRecord: AppUserEmploymentRecord;

  appUserEmploymentRecordAddSubscription: Subscription;
  contractTypeAllSubscription: Subscription;
  departureTypeAllSubscription: Subscription;

  contractTypes: ContractType[];
  departureTypes: DepartureType[];

  isSubmitted = false;

  appUserEmploymentRecordForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserEmploymentRecordForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserEmploymentRecordSrv: AppUserEmploymentRecordService,
              private contractTypeSrv: ContractTypeService,
              private departureTypeSrv: DepartureTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.appUserEmploymentRecord = new AppUserEmploymentRecord();
    this.getContractTypes();
    this.getDepartureTypes();
  }

  ngOnChanges() {
    this.appUserEmploymentRecordForm = new FormGroup ({
      'contractType' : new FormControl('', Validators.required),
      'departureType' : new FormControl('', Validators.required),
      'departureDateUTC' : new FormControl('', Validators.required),
      'movedToProductionUTC' : new FormControl('', Validators.required),
      'isReplaced' : new FormControl(false, Validators.required),
      'isEligibleRehire' : new FormControl(false, Validators.required),
      });
  }

  getContractTypes() {
    this.contractTypeSrv.apiUrl = environment.contractType.root;
    this.contractTypeAllSubscription = this.contractTypeSrv.getAll().subscribe((items: Array<ContractType>) => {
        this.contractTypes = items;
    });
  }

  getDepartureTypes() {
    this.departureTypeSrv.apiUrl = environment.departureType.root;
    this.departureTypeAllSubscription = this.departureTypeSrv.getAll().subscribe((items: Array<DepartureType>) => {
        this.departureTypes = items;
    });
  }

  onSave(appUserEmploymentRecordForm) {
    this.isSubmitted = true;

    if (appUserEmploymentRecordForm.valid) {
      this.appUserEmploymentRecord = appUserEmploymentRecordForm.value;
      this.appUserEmploymentRecord.appUserID = this.selectedAppUser.appUserID;
      this.appUserEmploymentRecord.contractTypeID = this.appUserEmploymentRecord.contractType.contractTypeID;
      this.appUserEmploymentRecord.departureTypeID = this.appUserEmploymentRecord.departureType.departureTypeID;
      // tslint:disable-next-line:max-line-length
      this.appUserEmploymentRecord.departureDateUTC = this.globalHelperSrv.localToUtc(new Date(this.appUserEmploymentRecord.departureDateUTC)).toUTCString();
      // tslint:disable-next-line:max-line-length
      this.appUserEmploymentRecord.movedToProductionUTC =  this.globalHelperSrv.localToUtc(new Date(this.appUserEmploymentRecord.movedToProductionUTC)).toUTCString();
      this.appUserEmploymentRecord.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserEmploymentRecord.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserEmploymentRecord.dateCreatedUTC = new Date().toUTCString();
      this.appUserEmploymentRecord.lastUpdatedUTC = new Date().toUTCString();
      this.appUserEmploymentRecord.contractType = null;
      this.appUserEmploymentRecord.departureType = null;

      this.appUserEmploymentRecordSrv.apiUrl = environment.app_user.employment_record.root;
      this.appUserEmploymentRecordAddSubscription = this.appUserEmploymentRecordSrv.post(this.appUserEmploymentRecord).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User Employment Record successfully created.' });

      this.appUserEmploymentRecord = new AppUserEmploymentRecord();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.appUserEmploymentRecordForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserEmploymentRecordAddSubscription) { this.appUserEmploymentRecordAddSubscription.unsubscribe(); }
    if (this.contractTypeAllSubscription) { this.contractTypeAllSubscription.unsubscribe(); }
    if (this.departureTypeAllSubscription) { this.departureTypeAllSubscription.unsubscribe(); }
  }

}
