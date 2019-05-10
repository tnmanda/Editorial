import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestigationEntityComponent } from './investigation/investigation-entity/investigation-entity.component';

const routes: Routes = [
  { path: '', component: InvestigationEntityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationRoutingModule { }
