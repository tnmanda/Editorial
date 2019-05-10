import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermapListComponent } from './usermap-list.component';
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
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { UsermapAddDialogComponent } from '../dialogs/usermap-add-dialog/usermap-add-dialog.component';
import { UsermapEditDialogComponent } from '../dialogs/usermap-edit-dialog/usermap-edit-dialog.component';
import { UsermapDeleteDialogComponent } from '../dialogs/usermap-delete-dialog/usermap-delete-dialog.component';
import { of } from 'rxjs';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';

class MockUserMapService extends UserMapService {}
class MockAppUserService extends AppUserService {}

describe('UsermapListComponent', () => {
  let component: UsermapListComponent;
  let fixture: ComponentFixture<UsermapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ UsermapListComponent, UsermapAddDialogComponent, UsermapEditDialogComponent, UsermapDeleteDialogComponent ],
      providers: [
        { provide: UserMapService, useClass: MockUserMapService },
        { provide: AppUserService, useClass: MockAppUserService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermapListComponent);
    component = fixture.componentInstance;

    const userMapSrv = fixture.debugElement.injector.get(UserMapService);
    spyOn(userMapSrv, 'getAll').and.returnValue(of ( [] ));

    const appUserSrv = fixture.debugElement.injector.get(AppUserService);
    spyOn(appUserSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
