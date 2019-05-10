import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUser } from '../../../../../../shared/models/admin/app-user.model';
import { AppUserInRole } from '../../../../../../shared/models/admin/app_user/app-user-in-role.model';
import { Subscription } from 'rxjs';
import { RoleType } from '../../../../../../shared/models/admin/types/role-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserInRoleService } from '../../../../../../shared/services/admin/app_user/app-user-in-role.service';
import { RoleTypeService } from '../../../../../../shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-user-in-role-add-dialog',
  templateUrl: './app-user-in-role-add-dialog.component.html',
  styleUrls: ['./app-user-in-role-add-dialog.component.css']
})
export class AppUserInRoleAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  appUserInRole: AppUserInRole;

  appUserInRoleAddSubscription: Subscription;
  roleTypeAllSubscription: Subscription;

  roleTypes: RoleType[];

  appUserInRoleForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserInRoleForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
    private appUserInRoleSrv: AppUserInRoleService,
    private roleTypeSrv: RoleTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.appUserInRoleForm = new FormGroup ({
      'roleType' : new FormControl('', Validators.required),
    });

  this.getRoleTypes();
  }

  getRoleTypes() {
    this.roleTypeSrv.apiUrl = environment.roleType.root;
    this.roleTypeAllSubscription = this.roleTypeSrv.getAll().subscribe((items: Array<RoleType>) => {
    this.roleTypes = items;
  });
  }

  onSave(appUserInRoleForm) {
    this.isSubmitted = true;
    console.log(appUserInRoleForm);
    if (appUserInRoleForm.valid) {
      this.appUserInRole = appUserInRoleForm.value;
      this.appUserInRole.appUserID = this.selectedAppUser.appUserID;
      this.appUserInRole.roleTypeID = this.appUserInRole.roleType.roleTypeID;
      this.appUserInRole.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserInRole.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserInRole.dateCreatedUTC = new Date().toUTCString();
      this.appUserInRole.lastUpdatedUTC = new Date().toUTCString();
      this.appUserInRole.roleType = null;
      console.log(this.appUserInRole);
      this.appUserInRoleSrv.apiUrl = environment.app_user.role.root;
      this.appUserInRoleAddSubscription = this.appUserInRoleSrv.post(this.appUserInRole).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: this.appUserInRole.roleTypeName + ' successfully created.' });

        this.appUserInRole = new AppUserInRole();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.appUserInRoleForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserInRoleAddSubscription) { this.appUserInRoleAddSubscription.unsubscribe(); }
    if (this.roleTypeAllSubscription) { this.roleTypeAllSubscription.unsubscribe(); }
  }


}
