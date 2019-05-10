import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceTypeAddDialogComponent } from './absence-type-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AbsenceTypeService } from 'src/app/shared/services/admin/types/absence-type.service';
import { MessageService } from 'primeng/api';

describe('AbsenceTypeAddDialogComponent', () => {
  let component: AbsenceTypeAddDialogComponent;
  let fixture: ComponentFixture<AbsenceTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ AbsenceTypeAddDialogComponent ],
      providers: [GlobalHelperService, AbsenceTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
