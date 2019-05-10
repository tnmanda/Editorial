import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddDialogComponent } from './team-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockOfficeService extends OfficeService {}
class MockLanguageTypeService extends LanguageTypeService {}
class MockAppUserService extends AppUserService {}

describe('TeamAddDialogComponent', () => {
  let component: TeamAddDialogComponent;
  let fixture: ComponentFixture<TeamAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule],
      declarations: [ TeamAddDialogComponent ],
      providers: [
        GlobalHelperService, TeamService, MessageService,
        { provide: OfficeService, useClass: MockOfficeService },
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
        { provide: AppUserService, useClass: MockAppUserService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddDialogComponent);
    component = fixture.componentInstance;

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
