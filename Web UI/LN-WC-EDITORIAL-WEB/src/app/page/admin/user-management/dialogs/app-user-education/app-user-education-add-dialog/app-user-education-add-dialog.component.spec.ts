import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserEducationAddDialogComponent } from './app-user-education-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserEducationService } from 'src/app/shared/services/admin/app_user/app-user-education.service';
import { EducationTypeService } from 'src/app/shared/services/admin/types/education-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockEducationTypeService extends EducationTypeService {}

describe('AppUserEducationAddDialogComponent', () => {
  let component: AppUserEducationAddDialogComponent;
  let fixture: ComponentFixture<AppUserEducationAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, FormsModule],
      declarations: [ AppUserEducationAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserEducationService, MessageService,
        { provide: EducationTypeService, useClass: MockEducationTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserEducationAddDialogComponent);
    component = fixture.componentInstance;

    const countrySrv = fixture.debugElement.injector.get(EducationTypeService);
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
