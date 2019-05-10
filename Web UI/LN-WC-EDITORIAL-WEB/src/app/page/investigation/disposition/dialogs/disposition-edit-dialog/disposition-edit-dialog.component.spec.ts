import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionEditDialogComponent } from './disposition-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { MessageService } from 'primeng/api';

describe('DispositionEditDialogComponent', () => {
  let component: DispositionEditDialogComponent;
  let fixture: ComponentFixture<DispositionEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule,
        InputTextareaModule, FormsModule],
      declarations: [ DispositionEditDialogComponent ],
      providers: [GlobalHelperService, DispositionService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
