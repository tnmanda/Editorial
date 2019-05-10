import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressTypeListComponent } from './address-type-list/address-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : AddressTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressTypeRoutingModule { }
