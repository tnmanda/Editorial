import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTypeDeleteDialogComponent } from './certificate-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CertificateTypeService } from 'src/app/shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';

describe('CertificateTypeDeleteDialogComponent', () => {
  let component: CertificateTypeDeleteDialogComponent;
  let fixture: ComponentFixture<CertificateTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ CertificateTypeDeleteDialogComponent ],
      providers: [CertificateTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
