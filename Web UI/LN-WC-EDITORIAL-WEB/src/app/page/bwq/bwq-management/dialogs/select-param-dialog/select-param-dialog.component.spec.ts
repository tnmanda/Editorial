import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParamDialogComponent } from './select-param-dialog.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { EntityService } from 'src/app/shared/services/bwq/entity.service';
import { of } from 'rxjs';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';

class MockCountryService extends CountryService {}
class MockAppUserService extends AppUserService {}
class MockEntityService extends EntityService {}

describe('SelectParamDialogComponent', () => {
  let component: SelectParamDialogComponent;
  let fixture: ComponentFixture<SelectParamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputTextareaModule, CalendarModule, ButtonModule, InputSwitchModule,
        DropdownModule, MultiSelectModule, ProgressBarModule, FormsModule],
      declarations: [ SelectParamDialogComponent ],
      providers: [
        GlobalHelperService,
        { provide: CountryService, useClass: MockCountryService },
        { provide: AppUserService, useClass: MockAppUserService },
        { provide: EntityService, useClass: MockEntityService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(SelectParamDialogComponent);
    component = fixture.componentInstance;

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    const appUserSrv = fixture.debugElement.injector.get(AppUserService);
    spyOn(appUserSrv, 'getAll').and.returnValue(of ( [] ));

    const entitySrv = fixture.debugElement.injector.get(EntityService);
    spyOn(entitySrv, 'getSources').and.returnValue(of ( [] ));
    spyOn(entitySrv, 'getCategories').and.returnValue(of ( [] ));
    spyOn(entitySrv, 'getSubCategories').and.returnValue(of ( [] ));
    spyOn(entitySrv, 'getLevels').and.returnValue(of ( [] ));

    fixture.detectChanges();
  }));

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
