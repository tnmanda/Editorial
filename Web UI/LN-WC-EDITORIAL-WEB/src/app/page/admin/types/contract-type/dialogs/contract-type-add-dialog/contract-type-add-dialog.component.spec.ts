import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeAddDialogComponent } from './contract-type-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { ContractTypeService } from 'src/app/shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';

describe('ContractTypeAddDialogComponent', () => {
  let component: ContractTypeAddDialogComponent;
  let fixture: ComponentFixture<ContractTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputTextareaModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ ContractTypeAddDialogComponent ],
      providers: [GlobalHelperService, ContractTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTypeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
