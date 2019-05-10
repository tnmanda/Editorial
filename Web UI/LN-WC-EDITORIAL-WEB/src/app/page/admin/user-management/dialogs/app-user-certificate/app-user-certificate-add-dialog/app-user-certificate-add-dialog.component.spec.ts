import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserCertificateAddDialogComponent } from './app-user-certificate-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserCertificateService } from 'src/app/shared/services/admin/app_user/app-user-certificate.service';
import { CertificateTypeService } from 'src/app/shared/services/admin/types/certificate-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockCertificateTypeService extends CertificateTypeService {}

describe('AppUserCertificateAddDialogComponent', () => {
  let component: AppUserCertificateAddDialogComponent;
  let fixture: ComponentFixture<AppUserCertificateAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, FormsModule],
      declarations: [ AppUserCertificateAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserCertificateService, MessageService,
        { provide: CertificateTypeService, useClass: MockCertificateTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserCertificateAddDialogComponent);
    component = fixture.componentInstance;

    const certificateTypeSrv = fixture.debugElement.injector.get(CertificateTypeService);
    spyOn(certificateTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
