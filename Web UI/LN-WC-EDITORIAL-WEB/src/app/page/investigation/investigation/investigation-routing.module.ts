import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestigationEntityManagementComponent } from './investigation-entity-management/investigation-entity-management.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : InvestigationEntityManagementComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationRoutingModule { }
