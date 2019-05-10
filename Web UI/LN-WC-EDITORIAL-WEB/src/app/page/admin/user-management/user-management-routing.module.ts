import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { UserManagementDetailComponent } from './user-management-detail/user-management-detail.component';

export const routes: Routes = [
  { path : '', component : UserManagementListComponent, canActivate: [AuthGuardService]},
  { path : 'user-management-detail/:appUserID', component : UserManagementDetailComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
