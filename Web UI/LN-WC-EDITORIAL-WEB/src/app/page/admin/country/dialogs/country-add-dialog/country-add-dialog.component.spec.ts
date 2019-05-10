import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAddDialogComponent } from './country-add-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';


describe('CountryAddDialogComponent', () => {
  let component: CountryAddDialogComponent;
  let fixture: ComponentFixture<CountryAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
                BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, FormsModule],
      declarations: [ CountryAddDialogComponent ],
      providers: [GlobalHelperService, CountryService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
