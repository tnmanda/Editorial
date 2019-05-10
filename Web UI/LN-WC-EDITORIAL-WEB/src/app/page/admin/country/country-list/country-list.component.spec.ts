import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListComponent } from './country-list.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { CountryAddDialogComponent } from '../dialogs/country-add-dialog/country-add-dialog.component';
import { CountryEditDialogComponent } from '../dialogs/country-edit-dialog/country-edit-dialog.component';
import { CountryDeleteDialogComponent } from '../dialogs/country-delete-dialog/country-delete-dialog.component';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';

class MockCountryService extends CountryService {}

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
                PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
                DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ CountryListComponent, CountryAddDialogComponent, CountryEditDialogComponent, CountryDeleteDialogComponent ],
      providers: [ { provide: CountryService, useClass: MockCountryService } ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;

    const service = fixture.debugElement.injector.get(CountryService);
    spyOn(service, 'getAll').and.returnValue(of ([]));

    fixture.detectChanges();
  }));

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
