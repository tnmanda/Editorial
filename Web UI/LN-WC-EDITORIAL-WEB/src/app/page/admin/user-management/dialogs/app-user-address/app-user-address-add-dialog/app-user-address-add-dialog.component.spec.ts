import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserAddressAddDialogComponent } from './app-user-address-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserAddressService } from 'src/app/shared/services/admin/app_user/app-user-address.service';
import { AddressTypeService } from 'src/app/shared/services/admin/types/address-type.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockAddressTypeService extends AddressTypeService {}
class MockCountryService extends CountryService {}

describe('AppUserAddressAddDialogComponent', () => {
  let component: AppUserAddressAddDialogComponent;
  let fixture: ComponentFixture<AppUserAddressAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule, InputTextModule,
        DropdownModule, FormsModule],
      declarations: [ AppUserAddressAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserAddressService, MessageService,
        { provide: AddressTypeService, useClass: MockAddressTypeService },
        { provide: CountryService, useClass: MockCountryService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserAddressAddDialogComponent);
    component = fixture.componentInstance;

    const addressTypeSrv = fixture.debugElement.injector.get(AddressTypeService);
    spyOn(addressTypeSrv, 'getAll').and.returnValue(of ( [] ));

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
