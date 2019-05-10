import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Office } from '../../../../../shared/models/admin/office.model';
import { Subscription } from 'rxjs';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { environment } from '../../../../../../environments/environment';
import { GenderType } from '../../../../../shared/models/admin/types/gender-type.model';
import { GenderTypeService } from '../../../../../shared/services/admin/types/gender-type.service';
import { OperationalRoleType } from '../../../../../shared/models/admin/operational-role-type.model';
import { OperationalRoleTypeService } from '../../../../../shared/services/admin/operational-role-type.service';
import { AppUser } from '../../../../../shared/models/admin/app-user.model';
import { AppUserService } from '../../../../../shared/services/admin/app-user.service';
import { BsModalRef } from 'ngx-bootstrap';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-management-edit-dialog',
  templateUrl: './user-management-edit-dialog.component.html',
  styleUrls: ['./user-management-edit-dialog.component.css'],
  providers: [MessageService]
})
export class UserManagementEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  // AppUser
  @Input() selectedAppUser: AppUser;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  appUserForm: FormGroup;

  officeAllSubscription: Subscription;
  genderTypeAllSubscription: Subscription;
  operationalRoleTypeAllSubscription: Subscription;
  appUserAllSubscription: Subscription;
  appUserEditSubscription: Subscription;

  offices: Office[];
  genderTypes: GenderType[];
  operationalRoleTypes: OperationalRoleType[];
  appUsers: AppUser[];

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserForm.controls; }


  constructor(private formBuilder: FormBuilder,
              private officeSrv: OfficeService,
              private genderTypeSrv: GenderTypeService,
              private operationalRoleTypeSrv: OperationalRoleTypeService,
              private appUserSrv: AppUserService,
              private globalHelperSrv: GlobalHelperService,
              private messageService: MessageService) {
   }

  ngOnInit() {
    this.getAppUserSupervisor();
    this.getOffices();
    this.getGenderTypes();
    this.getOperationalRoleType();
  }

  ngOnChanges(): void {
    if (this.selectedAppUser) {
      this.generateForm();
      if (this.display) {
        this.appUserForm.setValue({
          appUserData: {
            appUserName: this.selectedAppUser.appUserName,
            email: this.selectedAppUser.email,
            genderType: this.selectedAppUser.gender,
            operationalRoleType: this.selectedAppUser.operationalRole,
            office: this.selectedAppUser.office,
            supervisorAppUser: this.selectedAppUser.supervisorAppUser,
            utcOffset: this.selectedAppUser.utcOffset,
            isInternal: this.selectedAppUser.isInternal,
            isActive: this.selectedAppUser.isActive
          }
        });
      }
    }
  }

  generateForm() {
    this.appUserForm = this.formBuilder.group({
      'appUserData': new FormGroup({
        'appUserName' : new FormControl(null, [Validators.required]),
        'email' : new FormControl(null, [Validators.required]),
        'genderType' : new FormControl(null, [Validators.required]),
        'operationalRoleType' : new FormControl(null, [Validators.required]),
        'office' : new FormControl(null, [Validators.required]),
        'supervisorAppUser' : new FormControl(null, [Validators.required]),
        'utcOffset' : new FormControl(null, [Validators.required]),
        'isInternal' : new FormControl(null, [Validators.required]),
        'isActive' : new FormControl(null, [Validators.required]),
      })
    });
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
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const appUser = new AppUser();
      appUser.appUserID = this.selectedAppUser.appUserID;
      appUser.appUserName = <string>this.appUserForm.get('appUserData.appUserName').value;
      appUser.email = <string>this.appUserForm.get('appUserData.email').value;
      appUser.genderTypeID = <number>this.appUserForm.get('appUserData.genderType').value.genderTypeID;
      appUser.operationalRoleTypeID = <number>this.appUserForm.get('appUserData.operationalRoleType').value.operationalRoleTypeID;
      appUser.officeID = <number>this.appUserForm.get('appUserData.office').value.officeID;
      appUser.supervisorAppUserID = <number>this.appUserForm.get('appUserData.supervisorAppUser').value.appUserID;
      appUser.utcOffset = <number>this.appUserForm.get('appUserData.utcOffset').value;
      appUser.isInternal = <boolean>this.appUserForm.get('appUserData.isInternal').value;
      appUser.isActive = <boolean>this.appUserForm.get('appUserData.isActive').value;
      appUser.createdBy = this.selectedAppUser.createdBy;
      appUser.dateCreatedUTC = this.selectedAppUser.dateCreatedUTC;
      appUser.updatedBy = this.globalHelperSrv.getCurrentUser();
      appUser.lastUpdatedUTC = new Date().toUTCString();

      this.appUserSrv.apiUrl = environment.app_user.root;
      this.appUserEditSubscription = this.appUserSrv.put(appUser).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: appUser.appUserName + ' successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.appUserForm.reset();
    this.displayChange.emit(false);
    this.selectedAppUser = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.genderTypeAllSubscription) { this.genderTypeAllSubscription.unsubscribe(); }
    if (this.operationalRoleTypeAllSubscription) { this.operationalRoleTypeAllSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
    if (this.appUserEditSubscription) { this.appUserEditSubscription.unsubscribe(); }
  }

}
