import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTypeAddDialogComponent } from './address-type-add-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AddressTypeService } from 'src/app/shared/services/admin/types/address-type.service';
import { MessageService } from 'primeng/api';

describe('AddressTypeAddDialogComponent', () => {
  let component: AddressTypeAddDialogComponent;
  let fixture: ComponentFixture<AddressTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextareaModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ AddressTypeAddDialogComponent ],
      providers: [GlobalHelperService, AddressTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
