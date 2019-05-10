import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserLanguageDeleteDialogComponent } from './app-user-language-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserLanguageService } from 'src/app/shared/services/admin/app_user/app-user-language.service';
import { MessageService } from 'primeng/api';

describe('AppUserLanguageDeleteDialogComponent', () => {
  let component: AppUserLanguageDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserLanguageDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserLanguageDeleteDialogComponent ],
      providers: [ AppUserLanguageService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserLanguageDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
