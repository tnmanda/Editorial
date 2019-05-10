import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageTypeListComponent } from './language-type-list/language-type-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : LanguageTypeListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageTypeRoutingModule { }
