import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusListComponent } from './status-list.component';
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
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { StatusAddDialogComponent } from '../dialogs/status-add-dialog/status-add-dialog.component';
import { StatusEditDialogComponent } from '../dialogs/status-edit-dialog/status-edit-dialog.component';
import { StatusDeleteDialogComponent } from '../dialogs/status-delete-dialog/status-delete-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

class MockStatusService extends StatusService {}

describe('StatusListComponent', () => {
  let component: StatusListComponent;
  let fixture: ComponentFixture<StatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, DialogModule,
        ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ StatusListComponent, StatusAddDialogComponent, StatusEditDialogComponent,
      StatusDeleteDialogComponent ],
      providers: [
        { provide: StatusService, useClass: MockStatusService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusListComponent);
    component = fixture.componentInstance;

    const statusSrv = fixture.debugElement.injector.get(StatusService);
    spyOn(statusSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
