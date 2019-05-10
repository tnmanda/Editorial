import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserLanguageAddDialogComponent } from './app-user-language-add-dialog.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserLanguageService } from 'src/app/shared/services/admin/app_user/app-user-language.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { ProficiencyTypeService } from 'src/app/shared/services/admin/types/proficiency-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockLanguageTypeService extends LanguageTypeService {}
class MockProficiencyTypeService extends ProficiencyTypeService {}

describe('AppUserLanguageAddDialogComponent', () => {
  let component: AppUserLanguageAddDialogComponent;
  let fixture: ComponentFixture<AppUserLanguageAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, InputSwitchModule, FormsModule],
      declarations: [ AppUserLanguageAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserLanguageService, MessageService,
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
        { provide: ProficiencyTypeService, useClass: MockProficiencyTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserLanguageAddDialogComponent);
    component = fixture.componentInstance;

    const languageTypeSrv = fixture.debugElement.injector.get(LanguageTypeService);
    spyOn(languageTypeSrv, 'getAll').and.returnValue(of ( [] ));

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
