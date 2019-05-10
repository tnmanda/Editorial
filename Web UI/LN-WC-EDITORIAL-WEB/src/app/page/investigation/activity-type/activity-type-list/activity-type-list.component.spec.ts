import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeListComponent } from './activity-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { ActivityTypeAddDialogComponent } from '../dialogs/activity-type-add-dialog/activity-type-add-dialog.component';
import { ActivityTypeEditDialogComponent } from '../dialogs/activity-type-edit-dialog/activity-type-edit-dialog.component';
import { ActivityTypeDeleteDialogComponent } from '../dialogs/activity-type-delete-dialog/activity-type-delete-dialog.component';
import { of } from 'rxjs';

class MockActivityTypeService extends ActivityTypeService {}

describe('ActivityTypeListComponent', () => {
  let component: ActivityTypeListComponent;
  let fixture: ComponentFixture<ActivityTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, DialogModule,
        ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ ActivityTypeListComponent, ActivityTypeAddDialogComponent, ActivityTypeEditDialogComponent,
      ActivityTypeDeleteDialogComponent ],
      providers: [
        { provide: ActivityTypeService, useClass: MockActivityTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeListComponent);
    component = fixture.componentInstance;

    const activityTypeSrv = fixture.debugElement.injector.get(ActivityTypeService);
    spyOn(activityTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
