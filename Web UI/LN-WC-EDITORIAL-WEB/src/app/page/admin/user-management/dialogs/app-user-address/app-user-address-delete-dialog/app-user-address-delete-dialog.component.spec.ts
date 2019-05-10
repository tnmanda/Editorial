import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserAddressDeleteDialogComponent } from './app-user-address-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserAddressService } from 'src/app/shared/services/admin/app_user/app-user-address.service';
import { MessageService } from 'primeng/api';

describe('AppUserAddressDeleteDialogComponent', () => {
  let component: AppUserAddressDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserAddressDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserAddressDeleteDialogComponent ],
      providers: [AppUserAddressService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserAddressDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
