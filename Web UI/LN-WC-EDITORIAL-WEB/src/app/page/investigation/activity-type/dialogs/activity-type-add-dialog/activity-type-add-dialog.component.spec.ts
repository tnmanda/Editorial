import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeAddDialogComponent } from './activity-type-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { MessageService } from 'primeng/api';

describe('ActivityTypeAddDialogComponent', () => {
  let component: ActivityTypeAddDialogComponent;
  let fixture: ComponentFixture<ActivityTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule, InputSwitchModule,
        InputTextareaModule, FormsModule],
      declarations: [ ActivityTypeAddDialogComponent ],
      providers: [GlobalHelperService, ActivityTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
