import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
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
import { TeamDeleteDialogComponent } from '../dialogs/team-delete-dialog/team-delete-dialog.component';
import { TeamAddDialogComponent } from '../dialogs/team-add-dialog/team-add-dialog.component';
import { TeamEditDialogComponent } from '../dialogs/team-edit-dialog/team-edit-dialog.component';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { of } from 'rxjs';

class MockTeamService extends TeamService {}
class MockOfficeService extends OfficeService {}
class MockLanguageTypeService extends LanguageTypeService {}
class MockAppUserService extends AppUserService {}

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ TeamListComponent, TeamAddDialogComponent, TeamEditDialogComponent, TeamDeleteDialogComponent ],
      providers: [
        OfficeService, LanguageTypeService, AppUserService,
        { provide: TeamService, useClass: MockTeamService },
        { provide: OfficeService, useClass: MockOfficeService },
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
        { provide: AppUserService, useClass: MockAppUserService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;

    const teamSrv = fixture.debugElement.injector.get(TeamService);
    spyOn(teamSrv, 'getAll').and.returnValue(of ( [] ));

    const officeSrv = fixture.debugElement.injector.get(OfficeService);
    spyOn(officeSrv, 'getAll').and.returnValue(of ( [] ));

    const languageTypeSrv = fixture.debugElement.injector.get(LanguageTypeService);
    spyOn(languageTypeSrv, 'getAll').and.returnValue(of ( [] ));

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
