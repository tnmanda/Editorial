import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BwqEntityComponent } from './bwq-entity/bwq-entity.component';
import { BwqEntityEditComponent } from './bwq-entity-edit/bwq-entity-edit.component';

const routes: Routes = [
  { path: '', component: BwqEntityEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BwqManagementRoutingModule { }
