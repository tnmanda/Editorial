import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchListComponent } from './watch-list/watch-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { WatchKeywordListComponent } from './watch-keyword-list/watch-keyword-list.component';

export const routes: Routes = [
  { path : '', component : WatchListComponent, canActivate: [AuthGuardService]},
  { path : 'keyword-list/:watchID', component : WatchKeywordListComponent, canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchManagementRoutingModule { }
