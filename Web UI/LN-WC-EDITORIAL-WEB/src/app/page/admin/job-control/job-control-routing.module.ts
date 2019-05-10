import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobControlListComponent } from './job-control-list/job-control-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : JobControlListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobControlRoutingModule { }
