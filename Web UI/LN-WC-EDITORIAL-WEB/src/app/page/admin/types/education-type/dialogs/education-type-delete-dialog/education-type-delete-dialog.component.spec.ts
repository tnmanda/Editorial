import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTypeDeleteDialogComponent } from './education-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { EducationTypeService } from 'src/app/shared/services/admin/types/education-type.service';
import { MessageService } from 'primeng/api';

describe('EducationTypeDeleteDialogComponent', () => {
  let component: EducationTypeDeleteDialogComponent;
  let fixture: ComponentFixture<EducationTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ EducationTypeDeleteDialogComponent ],
      providers: [EducationTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
