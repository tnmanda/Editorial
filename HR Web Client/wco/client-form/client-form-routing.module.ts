import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstFormComponent } from './first-form/first-form.component';

const routes: Routes = [
  {path: '', component: FirstFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientFormRoutingModule { }
