import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenderTypeListComponent } from './gender-type-list/gender-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : GenderTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenderTypeRoutingModule { }
