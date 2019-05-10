import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractTypeListComponent } from './contract-type-list/contract-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : ContractTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractTypeRoutingModule { }
