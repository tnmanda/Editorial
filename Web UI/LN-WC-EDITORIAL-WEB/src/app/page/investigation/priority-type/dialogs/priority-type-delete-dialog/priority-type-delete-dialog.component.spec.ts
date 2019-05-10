import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityTypeDeleteDialogComponent } from './priority-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { MessageService } from 'primeng/api';

describe('PriorityTypeDeleteDialogComponent', () => {
  let component: PriorityTypeDeleteDialogComponent;
  let fixture: ComponentFixture<PriorityTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ PriorityTypeDeleteDialogComponent ],
      providers: [PriorityTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
