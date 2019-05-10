import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryEditDialogComponent } from './country-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';

describe('CountryEditDialogComponent', () => {
  let component: CountryEditDialogComponent;
  let fixture: ComponentFixture<CountryEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ CountryEditDialogComponent ],
      providers: [GlobalHelperService, CountryService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
