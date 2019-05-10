import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BwqManagementListComponent } from './bwq-management-list/bwq-management-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { BwqAddComponent } from './bwq-add/bwq-add.component';

export const routes: Routes = [
  { path : '', component : BwqManagementListComponent, canActivate: [AuthGuardService]},
  { path : 'bwq-add', component : BwqAddComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BwqManagementRoutingModule { }
