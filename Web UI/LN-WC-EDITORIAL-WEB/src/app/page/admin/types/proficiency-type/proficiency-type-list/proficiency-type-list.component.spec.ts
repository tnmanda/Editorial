import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyTypeListComponent } from './proficiency-type-list.component';
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
import { ProficiencyTypeService } from 'src/app/shared/services/admin/types/proficiency-type.service';
import { ProficiencyTypeEditDialogComponent } from '../dialogs/proficiency-type-edit-dialog/proficiency-type-edit-dialog.component';
import { ProficiencyTypeDeleteDialogComponent } from '../dialogs/proficiency-type-delete-dialog/proficiency-type-delete-dialog.component';
import { ProficiencyTypeAddDialogComponent } from '../dialogs/proficiency-type-add-dialog/proficiency-type-add-dialog.component';
import { of } from 'rxjs';

class MockProficiencyTypeService extends ProficiencyTypeService {}

describe('ProficiencyTypeListComponent', () => {
  let component: ProficiencyTypeListComponent;
  let fixture: ComponentFixture<ProficiencyTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ ProficiencyTypeListComponent, ProficiencyTypeAddDialogComponent, ProficiencyTypeEditDialogComponent,
      ProficiencyTypeDeleteDialogComponent ],
      providers: [
        { provide: ProficiencyTypeService, useClass: MockProficiencyTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProficiencyTypeListComponent);
    component = fixture.componentInstance;

    const proficiencyTypeSrv = fixture.debugElement.injector.get(ProficiencyTypeService);
    spyOn(proficiencyTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
