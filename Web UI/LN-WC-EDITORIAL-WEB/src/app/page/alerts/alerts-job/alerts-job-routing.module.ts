import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsManagementComponent } from './alerts-management/alerts-management.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : AlertsManagementComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsJobRoutingModule { }
