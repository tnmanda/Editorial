import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleType } from '../../../../shared/models/admin/types/role-type.model';
import { Subscription } from 'rxjs';
import { RoleTypeService } from '../../../../shared/services/admin/types/role-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { PageInUserRoleService } from '../../../../shared/services/admin/page-in-user-role.service';
import { PageInUserRole } from '../../../../shared/models/admin/page-in-user-role.model';
import { MessageService, MenuItem } from 'primeng/api';
@Component({
  selector: 'app-role-management-detail',
  templateUrl: './role-management-detail.component.html',
  styleUrls: ['./role-management-detail.component.css'],
  providers: [MessageService]
})
export class RoleManagementDetailComponent implements OnInit, OnDestroy {

  selectedRoleType: RoleType;
  selectedRoleTypeID: number;


  pageInUserRoles: PageInUserRole[];
  selectedPageInRole: PageInUserRole;

  roleTypeAllSubscription: Subscription;
  pageInUserRoleAllSubscription: Subscription;
  pageInUserRoleOneSubscription: Subscription;

  displayAddDialog = false;
  displayDeleteDialog = false;

  public items: MenuItem[];
  home: MenuItem;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private roleTypeSrv: RoleTypeService,
              private pageInUserRoleSrv: PageInUserRoleService) { }

  ngOnInit() {
    this.getRole();

    this.items = [
      {label: 'Administrator'},
      {label: 'Role Management', url: 'role-management'},
      {label: 'Details', url: 'role-management-detail/' + this.selectedRoleTypeID},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};
  }

  getRole() {
    if (this.route.snapshot.params['roleTypeID']) {
      this.selectedRoleTypeID = this.route.snapshot.params['roleTypeID'];
      this.roleTypeSrv.apiUrl = environment.roleType.root;
      this.roleTypeAllSubscription = this.roleTypeSrv.getAll().subscribe((items: Array<RoleType>) => {
        this.selectedRoleType = items.find(i => i.roleTypeID.toString() === this.selectedRoleTypeID.toString());
        console.log(this.selectedRoleType);
        this.getPageInRole(this.selectedRoleType.roleTypeID);
      });

    }
  }

  getPageInRole(roleTypeID) {
    console.log(roleTypeID);
    this.pageInUserRoleSrv.apiUrl = environment.page_in_user_role.by_role_id;
    this.pageInUserRoleAllSubscription = this.pageInUserRoleSrv.getByRoleID(roleTypeID).subscribe((items: Array<PageInUserRole>) => {
      this.pageInUserRoles = items;
    });
  }

  getPageInRoleByID(pageInUserRoleID: number) {
    this.pageInUserRoleSrv.apiUrl = environment.page_in_user_role.root;
    this.pageInUserRoleOneSubscription = this.pageInUserRoleSrv.getSingle(pageInUserRoleID.toString()).subscribe((item: PageInUserRole) => {

      this.selectedPageInRole = item;
      console.log(item);
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getPageInRole(this.selectedRoleType.roleTypeID);
  }

  showDeleteDialog(pageInUserRoleID) {
    this.getPageInRoleByID(pageInUserRoleID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getPageInRole(this.selectedRoleType.roleTypeID);
  }

  onBack() {
    this.router.navigate(['/role-management']);
  }

  ngOnDestroy() {
    if (this.roleTypeAllSubscription) { this.roleTypeAllSubscription.unsubscribe(); }
    if (this.pageInUserRoleAllSubscription) { this.pageInUserRoleAllSubscription.unsubscribe(); }
    if (this.pageInUserRoleOneSubscription) { this.pageInUserRoleOneSubscription.unsubscribe(); }
  }
}
