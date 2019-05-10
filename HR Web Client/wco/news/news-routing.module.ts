import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsQueueComponent } from './news-queue/news-queue.component';

const routes: Routes = [
  { path: '', component: NewsQueueComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
