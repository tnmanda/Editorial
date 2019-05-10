import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeEditDialogComponent } from './address-type-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AddressTypeService } from 'src/app/shared/services/admin/types/address-type.service';
import { MessageService } from 'primeng/api';

describe('AddressTypeEditDialogComponent', () => {
  let component: AddressTypeEditDialogComponent;
  let fixture: ComponentFixture<AddressTypeEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextareaModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ AddressTypeEditDialogComponent ],
      providers: [GlobalHelperService, AddressTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTypeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
