import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserInRoleDeleteDialogComponent } from './app-user-in-role-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserInRoleService } from 'src/app/shared/services/admin/app_user/app-user-in-role.service';
import { MessageService } from 'primeng/api';

describe('AppUserInRoleDeleteDialogComponent', () => {
  let component: AppUserInRoleDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserInRoleDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserInRoleDeleteDialogComponent ],
      providers: [ AppUserInRoleService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserInRoleDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
