import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProficiencyTypeListComponent } from './proficiency-type-list/proficiency-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : ProficiencyTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProficiencyTypeRoutingModule { }
