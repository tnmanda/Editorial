import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactTypeListComponent } from './contact-type-list/contact-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : ContactTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactTypeRoutingModule { }
