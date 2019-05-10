import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderTypeAddDialogComponent } from './gender-type-add-dialog.component';
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
import { GenderTypeService } from 'src/app/shared/services/admin/types/gender-type.service';
import { MessageService } from 'primeng/api';

describe('GenderTypeAddDialogComponent', () => {
  let component: GenderTypeAddDialogComponent;
  let fixture: ComponentFixture<GenderTypeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputTextareaModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ GenderTypeAddDialogComponent ],
      providers: [
          GlobalHelperService, MessageService, GenderTypeService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderTypeAddDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
