import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionTypeListComponent } from './function-type-list/function-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : FunctionTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionTypeRoutingModule { }
