import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceTypeListComponent } from './absence-type-list.component';
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
import { AbsenceTypeService } from 'src/app/shared/services/admin/types/absence-type.service';
import { AbsenceTypeAddDialogComponent } from '../dialogs/absence-type-add-dialog/absence-type-add-dialog.component';
import { AbsenceTypeEditDialogComponent } from '../dialogs/absence-type-edit-dialog/absence-type-edit-dialog.component';
import { AbsenceTypeDeleteDialogComponent } from '../dialogs/absence-type-delete-dialog/absence-type-delete-dialog.component';
import { of } from 'rxjs';

class MockAbsenceTypeService extends AbsenceTypeService {}

describe('AbsenceTypeListComponent', () => {
  let component: AbsenceTypeListComponent;
  let fixture: ComponentFixture<AbsenceTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, MultiSelectModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ AbsenceTypeListComponent, AbsenceTypeAddDialogComponent, AbsenceTypeEditDialogComponent,
        AbsenceTypeDeleteDialogComponent ],
        providers: [
          { provide: AbsenceTypeService, useClass: MockAbsenceTypeService },
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceTypeListComponent);
    component = fixture.componentInstance;

    const absenceTypeSrv = fixture.debugElement.injector.get(AbsenceTypeService);
    spyOn(absenceTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
