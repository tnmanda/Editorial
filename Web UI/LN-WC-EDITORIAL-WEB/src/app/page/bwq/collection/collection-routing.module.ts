import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

export const routes: Routes = [
  { path : '', component : CollectionListComponent, canActivate: [AuthGuardService]},
  { path : 'collection-detail/:collectionID', component : CollectionDetailComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
