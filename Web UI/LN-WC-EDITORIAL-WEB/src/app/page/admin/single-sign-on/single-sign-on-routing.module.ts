import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleSignOnComponent } from './single-sign-on/single-sign-on.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : SingleSignOnComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleSignOnRoutingModule { }
