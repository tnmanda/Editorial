import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDeleteDialogComponent } from './country-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';

describe('CountryDeleteDialogComponent', () => {
  let component: CountryDeleteDialogComponent;
  let fixture: ComponentFixture<CountryDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ CountryDeleteDialogComponent ],
      providers: [CountryService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
