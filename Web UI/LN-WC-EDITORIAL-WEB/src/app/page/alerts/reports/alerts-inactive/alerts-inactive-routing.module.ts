import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsInactiveReportComponent } from './alerts-inactive-report/alerts-inactive-report.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : AlertsInactiveReportComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsInactiveRoutingModule { }
