import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserEducationDeleteDialogComponent } from './app-user-education-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserEducationService } from 'src/app/shared/services/admin/app_user/app-user-education.service';
import { MessageService } from 'primeng/api';

describe('AppUserEducationDeleteDialogComponent', () => {
  let component: AppUserEducationDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserEducationDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserEducationDeleteDialogComponent ],
      providers: [ AppUserEducationService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserEducationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
