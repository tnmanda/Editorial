import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeListComponent } from './contract-type-list.component';
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
import { ContractTypeService } from 'src/app/shared/services/admin/types/contract-type.service';
import { ContractTypeAddDialogComponent } from '../dialogs/contract-type-add-dialog/contract-type-add-dialog.component';
import { ContractTypeEditDialogComponent } from '../dialogs/contract-type-edit-dialog/contract-type-edit-dialog.component';
import { ContractTypeDeleteDialogComponent } from '../dialogs/contract-type-delete-dialog/contract-type-delete-dialog.component';
import { of } from 'rxjs';

class MockContractTypeService extends ContractTypeService {}

describe('ContractTypeListComponent', () => {
  let component: ContractTypeListComponent;
  let fixture: ComponentFixture<ContractTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ ContractTypeListComponent, ContractTypeAddDialogComponent, ContractTypeEditDialogComponent,
      ContractTypeDeleteDialogComponent ],
      providers: [
        { provide: ContractTypeService, useClass: MockContractTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTypeListComponent);
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
