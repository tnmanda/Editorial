import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationTypeListComponent } from './education-type-list/education-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : EducationTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationTypeRoutingModule { }
