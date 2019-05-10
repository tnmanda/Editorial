import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsManagementComponent } from './news-management/news-management.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';

export const routes: Routes = [
  { path : '', component : NewsManagementComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsQueueRoutingModule { }
