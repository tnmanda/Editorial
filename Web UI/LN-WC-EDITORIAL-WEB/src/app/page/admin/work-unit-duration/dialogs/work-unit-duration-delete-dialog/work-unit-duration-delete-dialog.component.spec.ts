import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitDurationDeleteDialogComponent } from './work-unit-duration-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { MessageService } from 'primeng/api';

describe('WorkUnitDurationDeleteDialogComponent', () => {
  let component: WorkUnitDurationDeleteDialogComponent;
  let fixture: ComponentFixture<WorkUnitDurationDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ WorkUnitDurationDeleteDialogComponent ],
      providers: [WorkUnitDurationService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitDurationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
