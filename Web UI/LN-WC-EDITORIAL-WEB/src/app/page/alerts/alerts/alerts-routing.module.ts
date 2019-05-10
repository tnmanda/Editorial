import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsListComponent } from './alerts-list/alerts-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : AlertsListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
