import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTypeAddDialogComponent } from './certificate-type-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { CertificateTypeService } from 'src/app/shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';

describe('CertificateTypeAddDialogComponent', () => {
  let component: CertificateTypeAddDialogComponent;
  let fixture: ComponentFixture<CertificateTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputTextareaModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ CertificateTypeAddDialogComponent ],
      providers: [GlobalHelperService, CertificateTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
