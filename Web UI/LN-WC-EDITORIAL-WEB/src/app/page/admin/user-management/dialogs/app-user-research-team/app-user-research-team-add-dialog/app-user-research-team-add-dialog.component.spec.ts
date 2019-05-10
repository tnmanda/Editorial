import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserResearchTeamAddDialogComponent } from './app-user-research-team-add-dialog.component';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserResearchTeamService } from 'src/app/shared/services/admin/app_user/app-user-research-team.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockTeamService extends TeamService {}
class MockAppUserService extends AppUserService {}
class MockLanguageTypeService extends LanguageTypeService {}
class MockWorkUnitTypeService extends WorkUnitTypeService {}
class MockOfficeService extends OfficeService {}
class MockCountryService extends CountryService {}

describe('AppUserResearchTeamAddDialogComponent', () => {
  let component: AppUserResearchTeamAddDialogComponent;
  let fixture: ComponentFixture<AppUserResearchTeamAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule,
        DropdownModule, FormsModule],
      declarations: [ AppUserResearchTeamAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserResearchTeamService, MessageService,
        { provide: TeamService, useClass: MockTeamService },
        { provide: AppUserService, useClass: MockAppUserService },
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
        { provide: WorkUnitTypeService, useClass: MockWorkUnitTypeService },
        { provide: OfficeService, useClass: MockOfficeService },
        { provide: CountryService, useClass: MockCountryService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserResearchTeamAddDialogComponent);
    component = fixture.componentInstance;

    const teamSrv = fixture.debugElement.injector.get(TeamService);
    spyOn(teamSrv, 'getAll').and.returnValue(of ( [] ));

    const appUserSrv = fixture.debugElement.injector.get(AppUserService);
    spyOn(appUserSrv, 'getAll').and.returnValue(of ( [] ));

    const languageTypeSrv = fixture.debugElement.injector.get(LanguageTypeService);
    spyOn(languageTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const workUnitTypeSrv = fixture.debugElement.injector.get(WorkUnitTypeService);
    spyOn(workUnitTypeSrv, 'getAll').and.returnValue(of ( [] ));

    const officeSrv = fixture.debugElement.injector.get(OfficeService);
    spyOn(officeSrv, 'getAll').and.returnValue(of ( [] ));

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
