import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManagementListComponent } from './role-management-list/role-management-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { RoleManagementDetailComponent } from './role-management-detail/role-management-detail.component';

export const routes: Routes = [
  { path : '', component : RoleManagementListComponent, canActivate: [AuthGuardService]},
  { path : 'role-management-detail/:roleTypeID', component : RoleManagementDetailComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
