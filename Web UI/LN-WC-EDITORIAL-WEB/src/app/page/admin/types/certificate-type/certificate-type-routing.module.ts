import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateTypeListComponent } from './certificate-type-list/certificate-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : CertificateTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateTypeRoutingModule { }
