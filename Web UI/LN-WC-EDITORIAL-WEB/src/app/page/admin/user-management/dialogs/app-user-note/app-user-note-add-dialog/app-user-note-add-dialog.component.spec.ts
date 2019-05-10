import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserNoteAddDialogComponent } from './app-user-note-add-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserNoteService } from 'src/app/shared/services/admin/app_user/app-user-note.service';
import { MessageService } from 'primeng/api';

describe('AppUserNoteAddDialogComponent', () => {
  let component: AppUserNoteAddDialogComponent;
  let fixture: ComponentFixture<AppUserNoteAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, InputTextareaModule, FormsModule],
      declarations: [ AppUserNoteAddDialogComponent ],
      providers: [ GlobalHelperService, AppUserNoteService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserNoteAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
