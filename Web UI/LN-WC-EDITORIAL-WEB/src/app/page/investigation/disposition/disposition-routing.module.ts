import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispositionListComponent } from './disposition-list/disposition-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : DispositionListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispositionRoutingModule { }
