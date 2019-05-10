import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTypeDeleteDialogComponent } from './assignment-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AssignmentTypeService } from 'src/app/shared/services/admin/types/assignment-type.service';
import { MessageService } from 'primeng/api';

describe('AssignmentTypeDeleteDialogComponent', () => {
  let component: AssignmentTypeDeleteDialogComponent;
  let fixture: ComponentFixture<AssignmentTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AssignmentTypeDeleteDialogComponent ],
      providers: [AssignmentTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
