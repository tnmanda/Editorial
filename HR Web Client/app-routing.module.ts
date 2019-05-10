import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardWorkItemService } from './auth/auth/auth-guard-workItem.service';

export const routes: Routes = [
    // tslint:disable-next-line:max-line-length
  { path: 'wco/bwq/workItemId/:id', loadChildren: './clients/wco/bwq-management/bwq-management.module#BwqManagementModule', canLoad: [AuthGuardWorkItemService]},
  // tslint:disable-next-line:max-line-length
  { path: 'wco/investigation/workItemId/:id', loadChildren: './clients/wco/investigation/investigation.module#InvestigationModule', canLoad: [AuthGuardWorkItemService]},
  // tslint:disable-next-line:max-line-length
  { path: 'wco/alert/workItemId/:id', loadChildren: './clients/wco/alerts/alerts.module#AlertsModule', canLoad: [AuthGuardWorkItemService]},
  { path: 'wco/news/workItemId/:id', loadChildren: './clients/wco/news/news.module#NewsModule', canLoad: [AuthGuardWorkItemService]},
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
