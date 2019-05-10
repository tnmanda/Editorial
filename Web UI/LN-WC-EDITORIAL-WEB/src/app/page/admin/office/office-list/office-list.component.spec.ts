import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeListComponent } from './office-list.component';
import { OfficeAddDialogComponent } from '../dialogs/office-add-dialog/office-add-dialog.component';
import { OfficeEditDialogComponent } from '../dialogs/office-edit-dialog/office-edit-dialog.component';
import { OfficeDeleteDialogComponent } from '../dialogs/office-delete-dialog/office-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { of } from 'rxjs';

class MockOfficeService extends OfficeService {}
class MockCountryService extends CountryService {}

describe('OfficeListComponent', () => {
  let component: OfficeListComponent;
  let fixture: ComponentFixture<OfficeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ OfficeListComponent, OfficeAddDialogComponent, OfficeEditDialogComponent,
                    OfficeDeleteDialogComponent ],
      providers: [
                  { provide: OfficeService, useClass: MockOfficeService },
                  { provide: CountryService, useClass: MockCountryService },
                 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeListComponent);
    component = fixture.componentInstance;

    const officeSrv = fixture.debugElement.injector.get(OfficeService);
    spyOn(officeSrv, 'getAll').and.returnValue(of ( [] ));

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
