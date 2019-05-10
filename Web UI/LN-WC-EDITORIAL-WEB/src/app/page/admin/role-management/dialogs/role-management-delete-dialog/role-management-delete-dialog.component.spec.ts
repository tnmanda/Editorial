import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementDeleteDialogComponent } from './role-management-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RoleTypeService } from 'src/app/shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';

describe('RoleManagementDeleteDialogComponent', () => {
  let component: RoleManagementDeleteDialogComponent;
  let fixture: ComponentFixture<RoleManagementDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ RoleManagementDeleteDialogComponent ],
      providers: [RoleTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
