import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserAbsenceAddDialogComponent } from './app-user-absence-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserAbsenceService } from 'src/app/shared/services/admin/app_user/app-user-absence.service';
import { AbsenceTypeService } from 'src/app/shared/services/admin/types/absence-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockAbsenceTypeService extends AbsenceTypeService {}

describe('AppUserAbsenceAddDialogComponent', () => {
  let component: AppUserAbsenceAddDialogComponent;
  let fixture: ComponentFixture<AppUserAbsenceAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule],
      declarations: [ AppUserAbsenceAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserAbsenceService, MessageService,
        { provide: AbsenceTypeService, useClass: MockAbsenceTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserAbsenceAddDialogComponent);
    component = fixture.componentInstance;

    const absenceTypeSrv = fixture.debugElement.injector.get(AbsenceTypeService);
    spyOn(absenceTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
