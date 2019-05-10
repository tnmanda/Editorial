import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermapEditDialogComponent } from './usermap-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockAppUserService extends AppUserService {}

describe('UsermapEditDialogComponent', () => {
  let component: UsermapEditDialogComponent;
  let fixture: ComponentFixture<UsermapEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule,
        DropdownModule, FormsModule],
      declarations: [ UsermapEditDialogComponent ],
      providers: [
        GlobalHelperService, UserMapService, MessageService,
        { provide: AppUserService, useClass: MockAppUserService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermapEditDialogComponent);
    component = fixture.componentInstance;

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
