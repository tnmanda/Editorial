import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserFunctionDeleteDialogComponent } from './app-user-function-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserFunctionService } from 'src/app/shared/services/admin/app_user/app-user-function.service';
import { MessageService } from 'primeng/api';

describe('AppUserFunctionDeleteDialogComponent', () => {
  let component: AppUserFunctionDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserFunctionDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserFunctionDeleteDialogComponent ],
      providers: [ AppUserFunctionService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserFunctionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
