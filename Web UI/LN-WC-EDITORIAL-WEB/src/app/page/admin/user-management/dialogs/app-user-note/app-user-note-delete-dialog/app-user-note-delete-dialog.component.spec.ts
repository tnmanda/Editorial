import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserNoteDeleteDialogComponent } from './app-user-note-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserNoteService } from 'src/app/shared/services/admin/app_user/app-user-note.service';
import { MessageService } from 'primeng/api';

describe('AppUserNoteDeleteDialogComponent', () => {
  let component: AppUserNoteDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserNoteDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserNoteDeleteDialogComponent ],
      providers: [ AppUserNoteService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserNoteDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
