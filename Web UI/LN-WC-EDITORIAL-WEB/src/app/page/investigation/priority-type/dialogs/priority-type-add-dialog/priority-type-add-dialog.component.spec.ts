import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityTypeAddDialogComponent } from './priority-type-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { MessageService } from 'primeng/api';

describe('PriorityTypeAddDialogComponent', () => {
  let component: PriorityTypeAddDialogComponent;
  let fixture: ComponentFixture<PriorityTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule,
        InputTextareaModule, FormsModule],
      declarations: [ PriorityTypeAddDialogComponent ],
      providers: [GlobalHelperService, PriorityTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
