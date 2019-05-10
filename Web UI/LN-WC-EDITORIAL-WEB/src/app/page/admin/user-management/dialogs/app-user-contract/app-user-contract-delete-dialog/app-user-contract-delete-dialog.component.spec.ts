import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserContractDeleteDialogComponent } from './app-user-contract-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppUserContractService } from 'src/app/shared/services/admin/app_user/app-user-contract.service';
import { MessageService } from 'primeng/api';

describe('AppUserContractDeleteDialogComponent', () => {
  let component: AppUserContractDeleteDialogComponent;
  let fixture: ComponentFixture<AppUserContractDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AppUserContractDeleteDialogComponent ],
      providers: [ AppUserContractService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserContractDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
