import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTypeListComponent } from './certificate-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CertificateTypeService } from 'src/app/shared/services/admin/types/certificate-type.service';
import { CertificateTypeAddDialogComponent } from '../dialogs/certificate-type-add-dialog/certificate-type-add-dialog.component';
import { CertificateTypeEditDialogComponent } from '../dialogs/certificate-type-edit-dialog/certificate-type-edit-dialog.component';
import { CertificateTypeDeleteDialogComponent } from '../dialogs/certificate-type-delete-dialog/certificate-type-delete-dialog.component';
import { of } from 'rxjs';

class MockCertificateTypeService extends CertificateTypeService {}

describe('CertificateTypeListComponent', () => {
  let component: CertificateTypeListComponent;
  let fixture: ComponentFixture<CertificateTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ CertificateTypeListComponent, CertificateTypeAddDialogComponent, CertificateTypeEditDialogComponent,
      CertificateTypeDeleteDialogComponent ],
      providers: [
        { provide: CertificateTypeService, useClass: MockCertificateTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateTypeListComponent);
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
