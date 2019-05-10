import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureTypeListComponent } from './departure-type-list.component';
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
import { DepartureTypeService } from 'src/app/shared/services/admin/types/departure-type.service';
import { DepartureTypeAddDialogComponent } from '../dialogs/departure-type-add-dialog/departure-type-add-dialog.component';
import { DepartureTypeEditDialogComponent } from '../dialogs/departure-type-edit-dialog/departure-type-edit-dialog.component';
import { DepartureTypeDeleteDialogComponent } from '../dialogs/departure-type-delete-dialog/departure-type-delete-dialog.component';
import { of } from 'rxjs';

class MockDepartureTypeService extends DepartureTypeService {}

describe('DepartureTypeListComponent', () => {
  let component: DepartureTypeListComponent;
  let fixture: ComponentFixture<DepartureTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ DepartureTypeListComponent, DepartureTypeAddDialogComponent, DepartureTypeEditDialogComponent,
      DepartureTypeDeleteDialogComponent ],
      providers: [
        { provide: DepartureTypeService, useClass: MockDepartureTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureTypeListComponent);
    component = fixture.componentInstance;

    const departureTypeSrv = fixture.debugElement.injector.get(DepartureTypeService);
    spyOn(departureTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
