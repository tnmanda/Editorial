import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeDeleteDialogComponent } from './address-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AddressTypeService } from 'src/app/shared/services/admin/types/address-type.service';
import { MessageService } from 'primeng/api';

describe('AddressTypeDeleteDialogComponent', () => {
  let component: AddressTypeDeleteDialogComponent;
  let fixture: ComponentFixture<AddressTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ AddressTypeDeleteDialogComponent ],
      providers: [AddressTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
