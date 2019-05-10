import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserFunctionAddDialogComponent } from './app-user-function-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserFunctionService } from 'src/app/shared/services/admin/app_user/app-user-function.service';
import { FunctionTypeService } from 'src/app/shared/services/admin/types/function-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockFunctionTypeService extends FunctionTypeService {}

describe('AppUserFunctionAddDialogComponent', () => {
  let component: AppUserFunctionAddDialogComponent;
  let fixture: ComponentFixture<AppUserFunctionAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, DropdownModule, FormsModule],
      declarations: [ AppUserFunctionAddDialogComponent ],
      providers: [
        GlobalHelperService, AppUserFunctionService, MessageService,
        { provide: FunctionTypeService, useClass: MockFunctionTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserFunctionAddDialogComponent);
    component = fixture.componentInstance;

    const functionTypeSrv = fixture.debugElement.injector.get(FunctionTypeService);
    spyOn(functionTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
