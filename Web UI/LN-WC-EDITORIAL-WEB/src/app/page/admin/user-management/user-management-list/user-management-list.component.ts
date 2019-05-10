import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppUserService } from '../../../../shared/services/admin/app-user.service';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { AppUser } from '../../../../shared/models/admin/app-user.model';
import { MenuItem, MessageService } from 'primeng/api';
import { GenderTypeService } from '../../../../shared/services/admin/types/gender-type.service';
import { OfficeService } from '../../../../shared/services/admin/office.service';
import { OperationalRoleTypeService } from '../../../../shared/services/admin/operational-role-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.css'],
  providers: [MessageService]
})
export class UserManagementListComponent implements OnInit, OnDestroy {


  public items: MenuItem[];
  home: MenuItem;

  appUsers: AppUser[];
  selectedAppUser: AppUser;

  appUserAllSubscription: Subscription;
  appUserOneSubscription: Subscription;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private router: Router,
              private appUserSrv: AppUserService) { }

  ngOnInit() {

    this.items = [
      {label: 'Administrator'},
      {label: 'User Management', url: 'user-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getAppUsers();
  }

  getAppUsers() {
    this.appUserSrv.apiUrl = environment.app_user.detail;
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  getAppUserByID(appUserID: number) {
    this.appUserSrv.apiUrl = environment.app_user.root;
    this.appUserOneSubscription = this.appUserSrv.getSingle(appUserID.toString()).subscribe(async (item: AppUser) => {
      this.appUserSrv.apiUrl = environment.app_user.root;
      const supervisorAppUserResult = await this.appUserSrv.getSingle(item.supervisorAppUserID.toString()).toPromise();
      supervisorAppUserResult.office = null;
      supervisorAppUserResult.gender = null;
      supervisorAppUserResult.operationalRole = null;
      item.supervisorAppUser = supervisorAppUserResult;
      this.selectedAppUser = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getAppUsers();
  }

  showEditDialog(appUserID) {
    this.getAppUserByID(appUserID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getAppUsers();
  }

  showDeleteDialog(appUserID) {
    this.getAppUserByID(appUserID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getAppUsers();
  }

  showDetail(appUserID) {
    this.router.navigate(['user-management-detail', appUserID]);
  }

  ngOnDestroy(): void {
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
    if (this.appUserOneSubscription) { this.appUserOneSubscription.unsubscribe(); }
  }

}
