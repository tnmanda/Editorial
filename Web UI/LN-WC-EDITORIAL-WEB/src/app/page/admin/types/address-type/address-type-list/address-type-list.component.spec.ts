import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeListComponent } from './address-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressTypeService } from 'src/app/shared/services/admin/types/address-type.service';
import { AddressTypeAddDialogComponent } from '../dialogs/address-type-add-dialog/address-type-add-dialog.component';
import { AddressTypeEditDialogComponent } from '../dialogs/address-type-edit-dialog/address-type-edit-dialog.component';
import { AddressTypeDeleteDialogComponent } from '../dialogs/address-type-delete-dialog/address-type-delete-dialog.component';
import { of } from 'rxjs';

class MockAddressTypeService extends AddressTypeService {}

describe('AddressTypeListComponent', () => {
  let component: AddressTypeListComponent;
  let fixture: ComponentFixture<AddressTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, MultiSelectModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ AddressTypeListComponent, AddressTypeAddDialogComponent, AddressTypeEditDialogComponent,
      AddressTypeDeleteDialogComponent ],
      providers: [
        { provide: AddressTypeService, useClass: MockAddressTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTypeListComponent);
    component = fixture.componentInstance;

    const addressTypeSrv = fixture.debugElement.injector.get(AddressTypeService);
    spyOn(addressTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
