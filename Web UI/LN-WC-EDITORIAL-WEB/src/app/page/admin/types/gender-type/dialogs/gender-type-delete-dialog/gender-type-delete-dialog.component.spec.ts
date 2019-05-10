import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderTypeDeleteDialogComponent } from './gender-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { GenderTypeService } from 'src/app/shared/services/admin/types/gender-type.service';
import { MessageService } from 'primeng/api';

describe('GenderTypeDeleteDialogComponent', () => {
  let component: GenderTypeDeleteDialogComponent;
  let fixture: ComponentFixture<GenderTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ GenderTypeDeleteDialogComponent ],
      providers: [GenderTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
