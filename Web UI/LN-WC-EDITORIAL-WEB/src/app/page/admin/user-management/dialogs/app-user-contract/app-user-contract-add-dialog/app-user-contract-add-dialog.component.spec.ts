import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserContractAddDialogComponent } from './app-user-contract-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserContractService } from 'src/app/shared/services/admin/app_user/app-user-contract.service';
import { ContractTypeService } from 'src/app/shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockContractTypeService extends ContractTypeService {}

describe('AppUserContractAddDialogComponent', () => {
  let component: AppUserContractAddDialogComponent;
  let fixture: ComponentFixture<AppUserContractAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, CalendarModule, FormsModule],
      declarations: [ AppUserContractAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserContractService, MessageService,
        { provide: ContractTypeService, useClass: MockContractTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserContractAddDialogComponent);
    component = fixture.componentInstance;

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
