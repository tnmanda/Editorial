import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementAddDialogComponent } from './role-management-add-dialog.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { RoleTypeService } from 'src/app/shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';

describe('RoleManagementAddDialogComponent', () => {
  let component: RoleManagementAddDialogComponent;
  let fixture: ComponentFixture<RoleManagementAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule, InputSwitchModule,
        DropdownModule, FormsModule, ToastModule, MessageModule],
      declarations: [ RoleManagementAddDialogComponent ],
      providers: [GlobalHelperService, RoleTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
