import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitDurationEditDialogComponent } from './work-unit-duration-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockWorkUnitTypeService extends WorkUnitTypeService {}

describe('WorkUnitDurationEditDialogComponent', () => {
  let component: WorkUnitDurationEditDialogComponent;
  let fixture: ComponentFixture<WorkUnitDurationEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule, InputSwitchModule,
        DropdownModule, FormsModule],
      declarations: [ WorkUnitDurationEditDialogComponent ],
      providers: [
        GlobalHelperService, WorkUnitDurationService, MessageService,
        { provide: WorkUnitTypeService, useClass: MockWorkUnitTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitDurationEditDialogComponent);
    component = fixture.componentInstance;

    const workUnitTypeSrv = fixture.debugElement.injector.get(WorkUnitTypeService);
    spyOn(workUnitTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
