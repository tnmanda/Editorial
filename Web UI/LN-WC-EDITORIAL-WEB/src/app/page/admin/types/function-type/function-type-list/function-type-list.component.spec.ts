import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionTypeListComponent } from './function-type-list.component';
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
import { FunctionTypeService } from 'src/app/shared/services/admin/types/function-type.service';
import { FunctionTypeAddDialogComponent } from '../dialogs/function-type-add-dialog/function-type-add-dialog.component';
import { FunctionTypeEditDialogComponent } from '../dialogs/function-type-edit-dialog/function-type-edit-dialog.component';
import { FunctionTypeDeleteDialogComponent } from '../dialogs/function-type-delete-dialog/function-type-delete-dialog.component';
import { of } from 'rxjs';

class MockFunctionTypeService extends FunctionTypeService {}

describe('FunctionTypeListComponent', () => {
  let component: FunctionTypeListComponent;
  let fixture: ComponentFixture<FunctionTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ FunctionTypeListComponent, FunctionTypeAddDialogComponent, FunctionTypeEditDialogComponent,
      FunctionTypeDeleteDialogComponent ],
      providers: [
        { provide: FunctionTypeService, useClass: MockFunctionTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionTypeListComponent);
    component = fixture.componentInstance;

    const functionTypeSrv = fixture.debugElement.injector.get(FunctionTypeService);
    spyOn(functionTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
