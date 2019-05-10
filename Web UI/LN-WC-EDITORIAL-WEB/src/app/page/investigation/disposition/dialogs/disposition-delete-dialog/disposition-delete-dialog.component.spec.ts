import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionDeleteDialogComponent } from './disposition-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { MessageService } from 'primeng/api';

describe('DispositionDeleteDialogComponent', () => {
  let component: DispositionDeleteDialogComponent;
  let fixture: ComponentFixture<DispositionDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ DispositionDeleteDialogComponent ],
      providers: [DispositionService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
