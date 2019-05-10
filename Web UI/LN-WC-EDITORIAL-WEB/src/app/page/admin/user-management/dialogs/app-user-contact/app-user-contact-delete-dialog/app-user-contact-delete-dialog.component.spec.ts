import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserContactDeleteDialogComponent } from './app-user-contact-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserContactService } from 'src/app/shared/services/admin/app_user/app-user-contact.service';
import { MessageService } from 'primeng/api';

describe('AppUserContactDeleteDialogComponent', () => {
  let component: AppUserContactDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserContactDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserContactDeleteDialogComponent ],
      providers: [ AppUserContactService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserContactDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
