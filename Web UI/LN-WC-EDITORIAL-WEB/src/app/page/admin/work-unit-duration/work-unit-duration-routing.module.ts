import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkUnitDurationListComponent } from './work-unit-duration-list/work-unit-duration-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : WorkUnitDurationListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkUnitDurationRoutingModule { }
