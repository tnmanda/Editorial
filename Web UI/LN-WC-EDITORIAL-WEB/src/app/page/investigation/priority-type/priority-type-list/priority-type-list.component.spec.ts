import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityTypeListComponent } from './priority-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { PriorityTypeAddDialogComponent } from '../dialogs/priority-type-add-dialog/priority-type-add-dialog.component';
import { PriorityTypeEditDialogComponent } from '../dialogs/priority-type-edit-dialog/priority-type-edit-dialog.component';
import { PriorityTypeDeleteDialogComponent } from '../dialogs/priority-type-delete-dialog/priority-type-delete-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

class MockPriorityTypeService extends PriorityTypeService {}

describe('PriorityTypeListComponent', () => {
  let component: PriorityTypeListComponent;
  let fixture: ComponentFixture<PriorityTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, DialogModule,
        ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ PriorityTypeListComponent, PriorityTypeAddDialogComponent, PriorityTypeEditDialogComponent,
      PriorityTypeDeleteDialogComponent ],
      providers: [
        { provide: PriorityTypeService, useClass: MockPriorityTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityTypeListComponent);
    component = fixture.componentInstance;

    const priorityTypeSrv = fixture.debugElement.injector.get(PriorityTypeService);
    spyOn(priorityTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
