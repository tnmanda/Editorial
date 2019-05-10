import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkUnitTypeListComponent } from './work-unit-type-list/work-unit-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : WorkUnitTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkUnitTypeRoutingModule { }
