import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserContactAddDialogComponent } from './app-user-contact-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserContactService } from 'src/app/shared/services/admin/app_user/app-user-contact.service';
import { ContactTypeService } from 'src/app/shared/services/admin/types/contact-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockContactTypeService extends ContactTypeService {}

describe('AppUserContactAddDialogComponent', () => {
  let component: AppUserContactAddDialogComponent;
  let fixture: ComponentFixture<AppUserContactAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, InputTextModule, FormsModule],
      declarations: [ AppUserContactAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserContactService, MessageService,
        { provide: ContactTypeService, useClass: MockContactTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserContactAddDialogComponent);
    component = fixture.componentInstance;

    const contactTypeSrv = fixture.debugElement.injector.get(ContactTypeService);
    spyOn(contactTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
