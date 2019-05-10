import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceTypeDeleteDialogComponent } from './absence-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AbsenceTypeService } from 'src/app/shared/services/admin/types/absence-type.service';
import { MessageService } from 'primeng/api';

describe('AbsenceTypeDeleteDialogComponent', () => {
  let component: AbsenceTypeDeleteDialogComponent;
  let fixture: ComponentFixture<AbsenceTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AbsenceTypeDeleteDialogComponent ],
      providers: [AbsenceTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
