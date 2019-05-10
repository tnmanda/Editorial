import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,

    // Prime NG Components
    ToastModule,
  ],
  declarations: [
    NavMenuComponent,
    ErrorPageComponent,
    HomeComponent
  ],
  exports: [
    NavMenuComponent,
    ErrorPageComponent,
    HomeComponent
  ]
})
export class CoreModule { }
