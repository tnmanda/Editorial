import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementEditDialogComponent } from './role-management-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { RoleTypeService } from 'src/app/shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';

describe('RoleManagementEditDialogComponent', () => {
  let component: RoleManagementEditDialogComponent;
  let fixture: ComponentFixture<RoleManagementEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule, InputTextareaModule, InputSwitchModule,
        FormsModule, ToastModule],
      declarations: [ RoleManagementEditDialogComponent ],
      providers: [GlobalHelperService, RoleTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
