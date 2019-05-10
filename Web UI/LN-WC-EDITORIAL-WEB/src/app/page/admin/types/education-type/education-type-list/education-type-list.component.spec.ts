import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTypeListComponent } from './education-type-list.component';
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
import { EducationTypeService } from 'src/app/shared/services/admin/types/education-type.service';
import { EducationTypeAddDialogComponent } from '../dialogs/education-type-add-dialog/education-type-add-dialog.component';
import { EducationTypeEditDialogComponent } from '../dialogs/education-type-edit-dialog/education-type-edit-dialog.component';
import { EducationTypeDeleteDialogComponent } from '../dialogs/education-type-delete-dialog/education-type-delete-dialog.component';
import { of } from 'rxjs';

class MockEducationTypeService extends EducationTypeService {}

describe('EducationTypeListComponent', () => {
  let component: EducationTypeListComponent;
  let fixture: ComponentFixture<EducationTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ EducationTypeListComponent, EducationTypeAddDialogComponent, EducationTypeEditDialogComponent,
      EducationTypeDeleteDialogComponent ],
      providers: [
        { provide: EducationTypeService, useClass: MockEducationTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTypeListComponent);
    component = fixture.componentInstance;

    const educationTypeSrv = fixture.debugElement.injector.get(EducationTypeService);
    spyOn(educationTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
