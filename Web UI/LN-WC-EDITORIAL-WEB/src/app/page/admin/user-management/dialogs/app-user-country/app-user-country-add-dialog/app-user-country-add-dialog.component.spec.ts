import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserCountryAddDialogComponent } from './app-user-country-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserCountryService } from 'src/app/shared/services/admin/app_user/app-user-country.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockCountryService extends CountryService {}

describe('AppUserCountryAddDialogComponent', () => {
  let component: AppUserCountryAddDialogComponent;
  let fixture: ComponentFixture<AppUserCountryAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, InputSwitchModule, FormsModule],
      declarations: [ AppUserCountryAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserCountryService, MessageService,
        { provide: CountryService, useClass: MockCountryService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserCountryAddDialogComponent);
    component = fixture.componentInstance;

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
