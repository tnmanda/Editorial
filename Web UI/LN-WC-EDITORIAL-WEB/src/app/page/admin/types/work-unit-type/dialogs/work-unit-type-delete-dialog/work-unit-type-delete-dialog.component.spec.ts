import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitTypeDeleteDialogComponent } from './work-unit-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { MessageService } from 'primeng/api';

describe('WorkUnitTypeDeleteDialogComponent', () => {
  let component: WorkUnitTypeDeleteDialogComponent;
  let fixture: ComponentFixture<WorkUnitTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ WorkUnitTypeDeleteDialogComponent ],
      providers: [WorkUnitTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
