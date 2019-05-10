import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriorityTypeListComponent } from './priority-type-list/priority-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : PriorityTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriorityTypeRoutingModule { }
