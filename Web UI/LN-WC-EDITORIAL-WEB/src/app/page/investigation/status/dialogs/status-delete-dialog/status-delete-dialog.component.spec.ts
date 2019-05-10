import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDeleteDialogComponent } from './status-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { MessageService } from 'primeng/api';

describe('StatusDeleteDialogComponent', () => {
  let component: StatusDeleteDialogComponent;
  let fixture: ComponentFixture<StatusDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ StatusDeleteDialogComponent ],
      providers: [StatusService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
