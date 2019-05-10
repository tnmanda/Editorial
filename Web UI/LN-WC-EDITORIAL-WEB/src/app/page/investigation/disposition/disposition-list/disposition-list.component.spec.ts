import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionListComponent } from './disposition-list.component';
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
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { DispositionAddDialogComponent } from '../dialogs/disposition-add-dialog/disposition-add-dialog.component';
import { DispositionEditDialogComponent } from '../dialogs/disposition-edit-dialog/disposition-edit-dialog.component';
import { DispositionDeleteDialogComponent } from '../dialogs/disposition-delete-dialog/disposition-delete-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';

class MockDispositionService extends DispositionService {}

describe('DispositionListComponent', () => {
  let component: DispositionListComponent;
  let fixture: ComponentFixture<DispositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, DialogModule,
        ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ DispositionListComponent, DispositionAddDialogComponent, DispositionEditDialogComponent,
      DispositionDeleteDialogComponent ],
      providers: [
        { provide: DispositionService, useClass: MockDispositionService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionListComponent);
    component = fixture.componentInstance;

    const dispositionSrv = fixture.debugElement.injector.get(DispositionService);
    spyOn(dispositionSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
