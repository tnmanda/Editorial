import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTypeDeleteDialogComponent } from './language-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';

describe('LanguageTypeDeleteDialogComponent', () => {
  let component: LanguageTypeDeleteDialogComponent;
  let fixture: ComponentFixture<LanguageTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ LanguageTypeDeleteDialogComponent ],
      providers: [LanguageTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
