import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserCountryDeleteDialogComponent } from './app-user-country-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserCountryService } from 'src/app/shared/services/admin/app_user/app-user-country.service';
import { MessageService } from 'primeng/api';

describe('AppUserCountryDeleteDialogComponent', () => {
  let component: AppUserCountryDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserCountryDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserCountryDeleteDialogComponent ],
      providers: [ AppUserCountryService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserCountryDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
