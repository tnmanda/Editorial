import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeDeleteDialogComponent } from './contract-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ContractTypeService } from 'src/app/shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';

describe('ContractTypeDeleteDialogComponent', () => {
  let component: ContractTypeDeleteDialogComponent;
  let fixture: ComponentFixture<ContractTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ ContractTypeDeleteDialogComponent ],
      providers: [ContractTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
