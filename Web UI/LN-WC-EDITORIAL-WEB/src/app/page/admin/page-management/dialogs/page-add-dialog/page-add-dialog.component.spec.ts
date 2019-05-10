import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddDialogComponent } from './page-add-dialog.component';
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
import { PageService } from 'src/app/shared/services/admin/page.service';
import { PageGroupService } from 'src/app/shared/services/admin/page-group.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { of } from 'rxjs';

class MockPageGroupService extends PageGroupService {}

describe('PageAddDialogComponent', () => {
  let component: PageAddDialogComponent;
  let fixture: ComponentFixture<PageAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule, ToastModule, MessageModule],
      declarations: [ PageAddDialogComponent ],
      providers: [
        GlobalHelperService, PageService, MessageService,
        { provide: PageGroupService, useClass: MockPageGroupService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddDialogComponent);
    component = fixture.componentInstance;

    const pageGroupSrv = fixture.debugElement.injector.get(PageGroupService);
    spyOn(pageGroupSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
