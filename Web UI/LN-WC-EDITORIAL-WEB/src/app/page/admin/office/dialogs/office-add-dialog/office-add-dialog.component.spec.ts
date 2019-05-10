import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAddDialogComponent } from './office-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { OfficeService } from 'src/app/shared/services/admin/office.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { of } from 'rxjs';

class MockCountryService extends CountryService {}

describe('OfficeAddDialogComponent', () => {
  let component: OfficeAddDialogComponent;
  let fixture: ComponentFixture<OfficeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputSwitchModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule],
      declarations: [ OfficeAddDialogComponent ],
      providers: [
                    GlobalHelperService, OfficeService, MessageService,
                    { provide: CountryService, useClass: MockCountryService },
                  ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAddDialogComponent);
    component = fixture.componentInstance;

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
