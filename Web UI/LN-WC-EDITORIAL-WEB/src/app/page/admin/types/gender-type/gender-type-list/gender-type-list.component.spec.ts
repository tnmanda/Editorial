import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderTypeListComponent } from './gender-type-list.component';
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
import { GenderTypeService } from 'src/app/shared/services/admin/gender-type.service';
import { GenderTypeAddDialogComponent } from '../dialogs/gender-type-add-dialog/gender-type-add-dialog.component';
import { GenderTypeEditDialogComponent } from '../dialogs/gender-type-edit-dialog/gender-type-edit-dialog.component';
import { GenderTypeDeleteDialogComponent } from '../dialogs/gender-type-delete-dialog/gender-type-delete-dialog.component';
import { of } from 'rxjs';

class MockGenderTypeService extends GenderTypeService {}

describe('GenderTypeListComponent', () => {
  let component: GenderTypeListComponent;
  let fixture: ComponentFixture<GenderTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ GenderTypeListComponent, GenderTypeAddDialogComponent, GenderTypeEditDialogComponent,
      GenderTypeDeleteDialogComponent ],
      providers: [
        { provide: GenderTypeService, useClass: MockGenderTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderTypeListComponent);
    component = fixture.componentInstance;

    const genderTypeSrv = fixture.debugElement.injector.get(GenderTypeService);
    spyOn(genderTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
