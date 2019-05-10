import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureTypeDeleteDialogComponent } from './departure-type-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DepartureTypeService } from 'src/app/shared/services/admin/types/departure-type.service';
import { MessageService } from 'primeng/api';

describe('DepartureTypeDeleteDialogComponent', () => {
  let component: DepartureTypeDeleteDialogComponent;
  let fixture: ComponentFixture<DepartureTypeDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ DepartureTypeDeleteDialogComponent ],
      providers: [DepartureTypeService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureTypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
