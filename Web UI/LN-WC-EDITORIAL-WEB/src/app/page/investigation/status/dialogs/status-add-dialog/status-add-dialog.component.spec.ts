import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAddDialogComponent } from './status-add-dialog.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { MessageService } from 'primeng/api';

describe('StatusAddDialogComponent', () => {
  let component: StatusAddDialogComponent;
  let fixture: ComponentFixture<StatusAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule,
        InputTextareaModule, InputSwitchModule, FormsModule],
      declarations: [ StatusAddDialogComponent ],
      providers: [GlobalHelperService, StatusService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
