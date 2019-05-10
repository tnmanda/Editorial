import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserEmploymentRecordAddDialogComponent } from './app-user-employment-record-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserEmploymentRecordService } from 'src/app/shared/services/admin/app_user/app-user-employment-record.service';
import { ContractTypeService } from 'src/app/shared/services/admin/types/contract-type.service';
import { DepartureTypeService } from 'src/app/shared/services/admin/types/departure-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockDepartureTypeService extends DepartureTypeService {}
class MockContractTypeService extends ContractTypeService {}

describe('AppUserEmploymentRecordAddDialogComponent', () => {
  let component: AppUserEmploymentRecordAddDialogComponent;
  let fixture: ComponentFixture<AppUserEmploymentRecordAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, CalendarModule, InputSwitchModule, FormsModule],
      declarations: [ AppUserEmploymentRecordAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserEmploymentRecordService, MessageService,
        { provide: DepartureTypeService, useClass: MockDepartureTypeService },
        { provide: ContractTypeService, useClass: MockContractTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserEmploymentRecordAddDialogComponent);
    component = fixture.componentInstance;

    const departureTypeSrv = fixture.debugElement.injector.get(DepartureTypeService);
    spyOn(departureTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const contractTypeSrv = fixture.debugElement.injector.get(ContractTypeService);
    spyOn(contractTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
