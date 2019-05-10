import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsPastDueReportComponent } from './alerts-past-due-report/alerts-past-due-report.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : AlertsPastDueReportComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsPastDueRoutingModule { }
