import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Office } from '../../../../../shared/models/admin/office.model';
import { GenderType } from '../../../../../shared/models/admin/types/gender-type.model';
import { OperationalRoleType } from '../../../../../shared/models/admin/operational-role-type.model';
import { AppUser } from '../../../../../shared/models/admin/app-user.model';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { GenderTypeService } from '../../../../../shared/services/admin/types/gender-type.service';
import { OperationalRoleTypeService } from '../../../../../shared/services/admin/operational-role-type.service';
import { AppUserService } from '../../../../../shared/services/admin/app-user.service';
import { environment } from '../../../../../../environments/environment';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-user-management-add-dialog',
  templateUrl: './user-management-add-dialog.component.html',
  styleUrls: ['./user-management-add-dialog.component.css'],
  providers: [MessageService]
})
export class UserManagementAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  appUserForm: FormGroup;
  appUser: AppUser;

  officeAllSubscription: Subscription;
  genderTypeAllSubscription: Subscription;
  operationalRoleTypeAllSubscription: Subscription;
  getAppUserAllSubscription: Subscription;
  postAppUserAddSubscription: Subscription;

  offices: Office[];
  genderTypes: GenderType[];
  operationalRoleTypes: OperationalRoleType[];
  appUsers: AppUser[];

  errorMessage: string;

    // convenience getter for easy access to form fields
  get f() { return this.appUserForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private officeSrv: OfficeService,
              private genderTypeSrv: GenderTypeService,
              private operationalRoleTypeSrv: OperationalRoleTypeService,
              private appUserSrv: AppUserService,
              private messageService: MessageService) {
}

  ngOnInit() {
    this.appUserForm = new FormGroup({
      'appUserName': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'genderType': new FormControl('', [Validators.required]),
      'operationalRoleType': new FormControl('', [Validators.required]),
      'office': new FormControl('', [Validators.required]),
      'supervisorAppUser': new FormControl('', [Validators.required]),
      'utcOffset': new FormControl('', [Validators.required]),
      'isInternal': new FormControl(false, [Validators.required]),
      'isActive': new FormControl(false, [Validators.required]),
    });

    this.getOffices();
    this.getGenderTypes();
    this.getOperationalRoleType();
    this.getAppUserSupervisor();
  }

  getOffices() {
    this.officeSrv.apiUrl = environment.office.root;
    this.officeAllSubscription = this.officeSrv.getAll().subscribe((items: Array<Office>) => {
        this.offices = items;
    });
  }

  getGenderTypes() {
    this.genderTypeSrv.apiUrl = environment.genderType.root;
    this.genderTypeAllSubscription = this.genderTypeSrv.getAll().subscribe((items: Array<GenderType>) => {
        this.genderTypes = items;
    });
  }

  getOperationalRoleType() {
    this.operationalRoleTypeSrv.apiUrl = environment.operationalRole.root;
    this.operationalRoleTypeAllSubscription = this.operationalRoleTypeSrv.getAll().subscribe((items: Array<OperationalRoleType>) => {
        this.operationalRoleTypes = items;
    });
  }

  getAppUserSupervisor() {
    this.appUserSrv.apiUrl = environment.app_user.root;
    this.getAppUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  onSave(appUserForm) {
    this.isSubmitted = true;
    if (appUserForm.valid) {
      this.appUser = this.appUserForm.value;
      this.appUser.appUserName = this.appUserForm.value.appUserName;
      this.appUser.email = this.appUserForm.value.email;
      this.appUser.photoImage = null;
      this.appUser.utcOffset = this.appUserForm.value.utcOffset;
      this.appUser.isInternal = this.appUserForm.value.isInternal;
      this.appUser.isActive = this.appUserForm.value.isActive;
      this.appUser.genderTypeID = this.appUserForm.value.genderType.genderTypeID;
      this.appUser.operationalRoleTypeID = this.appUserForm.value.operationalRoleType.operationalRoleTypeID;
      this.appUser.officeID = this.appUserForm.value.office.officeID;
      this.appUser.supervisorAppUserID = this.appUserForm.value.supervisorAppUser.appUserID;
      this.appUser.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUser.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUser.dateCreatedUTC = new Date().toUTCString();
      this.appUser.lastUpdatedUTC = new Date().toUTCString();
      this.appUser.gender = null;
      this.appUser.office = null;
      this.appUser.operationalRole = null;
      this.appUserSrv.apiUrl = environment.app_user.root;
      this.postAppUserAddSubscription = this.appUserSrv.post(this.appUser).subscribe(result => {


        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: this.appUser.appUserName + ' successfully created.' });

        this.onClose();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.appUserForm.reset();
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.displayChange.unsubscribe();
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.genderTypeAllSubscription) { this.genderTypeAllSubscription.unsubscribe(); }
    if (this.operationalRoleTypeAllSubscription) { this.operationalRoleTypeAllSubscription.unsubscribe(); }
    if (this.getAppUserAllSubscription) { this.getAppUserAllSubscription.unsubscribe(); }
    if (this.postAppUserAddSubscription) { this.postAppUserAddSubscription.unsubscribe(); }
  }


}
