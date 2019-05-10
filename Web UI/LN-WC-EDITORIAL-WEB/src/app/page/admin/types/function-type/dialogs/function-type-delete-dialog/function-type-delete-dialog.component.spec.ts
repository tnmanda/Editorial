import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionTypeDeleteDialogComponent } from './function-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { FunctionTypeService } from 'src/app/shared/services/admin/types/function-type.service';
import { MessageService } from 'primeng/api';

describe('FunctionTypeDeleteDialogComponent', () => {
  let component: FunctionTypeDeleteDialogComponent;
  let fixture: ComponentFixture<FunctionTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ FunctionTypeDeleteDialogComponent ],
      providers: [FunctionTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
