import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleType } from '../../../../shared/models/admin/types/role-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { RoleTypeService } from '../../../../shared/services/admin/types/role-type.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management-list',
  templateUrl: './role-management-list.component.html',
  styleUrls: ['./role-management-list.component.css'],
  providers: [MessageService]
})
export class RoleManagementListComponent implements OnInit, OnDestroy {

  selectedRoleType: RoleType;
  roleTypeAllSubscription: Subscription;
  roleTypeOneSubscription: Subscription;

  roleTypes: RoleType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private roleTypeSrv: RoleTypeService,
              private router: Router) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Role Management', url: 'role-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getRoleTypes();
  }

  getRoleTypes() {
    this.roleTypeSrv.apiUrl = environment.roleType.root;
    this.roleTypeAllSubscription = this.roleTypeSrv.getAll().subscribe((items: Array<RoleType>) => {
        this.roleTypes = items;
    });
  }

  getRoleTypeByID(roleTypeID: number) {
    this.roleTypeSrv.apiUrl = environment.roleType.root;
    this.roleTypeOneSubscription = this.roleTypeSrv.getSingle(roleTypeID.toString()).subscribe((item: RoleType) => {
      this.selectedRoleType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getRoleTypes();
  }

  showEditDialog(roleTypeID) {
    this.getRoleTypeByID(roleTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getRoleTypes();
  }

  showDeleteDialog(roleTypeID) {
    this.getRoleTypeByID(roleTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getRoleTypes();
  }

  showDetail(roleTypeID) {
    this.router.navigate(['role-management-detail', roleTypeID]);
  }

  ngOnDestroy(): void {
    if (this.roleTypeAllSubscription) { this.roleTypeAllSubscription.unsubscribe(); }
    if (this.roleTypeOneSubscription) { this.roleTypeOneSubscription.unsubscribe(); }
  }


}
