import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BwqManagementRoutingModule } from './bwq-management-routing.module';
import { BwqEntityComponent } from './bwq-entity/bwq-entity.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from '../../../auth/auth/auth.service';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { BwqEntityEditComponent } from './bwq-entity-edit/bwq-entity-edit.component';

@NgModule({
  imports: [
    CommonModule,
    BwqManagementRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [BwqEntityComponent, BwqEntityEditComponent],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class BwqManagementModule { }
