import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BwqEntityManagementComponent } from './bwq-entity-management/bwq-entity-management.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : BwqEntityManagementComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BwqEntityRoutingModule { }
