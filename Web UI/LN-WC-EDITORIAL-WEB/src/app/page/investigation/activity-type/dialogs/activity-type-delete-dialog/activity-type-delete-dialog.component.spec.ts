import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeDeleteDialogComponent } from './activity-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { MessageService } from 'primeng/api';

describe('ActivityTypeDeleteDialogComponent', () => {
  let component: ActivityTypeDeleteDialogComponent;
  let fixture: ComponentFixture<ActivityTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ ActivityTypeDeleteDialogComponent ],
      providers: [ActivityTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
