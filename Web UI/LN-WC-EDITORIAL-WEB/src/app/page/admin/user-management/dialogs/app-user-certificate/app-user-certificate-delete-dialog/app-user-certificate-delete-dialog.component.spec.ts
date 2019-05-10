import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserCertificateDeleteDialogComponent } from './app-user-certificate-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserCertificateService } from 'src/app/shared/services/admin/app_user/app-user-certificate.service';
import { MessageService } from 'primeng/api';

describe('AppUserCertificateDeleteDialogComponent', () => {
  let component: AppUserCertificateDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserCertificateDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserCertificateDeleteDialogComponent ],
      providers: [ AppUserCertificateService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserCertificateDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
