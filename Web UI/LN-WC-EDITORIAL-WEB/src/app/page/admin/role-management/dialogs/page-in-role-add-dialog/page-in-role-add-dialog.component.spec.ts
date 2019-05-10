import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInRoleAddDialogComponent } from './page-in-role-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { PageService } from 'src/app/shared/services/admin/page.service';
import { PageInUserRoleService } from 'src/app/shared/services/admin/page-in-user-role.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockPageService extends PageService {}

describe('PageInRoleAddDialogComponent', () => {
  let component: PageInRoleAddDialogComponent;
  let fixture: ComponentFixture<PageInRoleAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule, ToastModule, MessageModule],
      declarations: [ PageInRoleAddDialogComponent ],
      providers: [
        GlobalHelperService, PageInUserRoleService, MessageService,
        { provide: PageService, useClass: MockPageService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInRoleAddDialogComponent);
    component = fixture.componentInstance;

    const pageSrv = fixture.debugElement.injector.get(PageService);
    spyOn(pageSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
