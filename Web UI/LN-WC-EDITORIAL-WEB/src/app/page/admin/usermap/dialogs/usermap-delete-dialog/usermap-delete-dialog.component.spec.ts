import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermapDeleteDialogComponent } from './usermap-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { MessageService } from 'primeng/api';

describe('UsermapDeleteDialogComponent', () => {
  let component: UsermapDeleteDialogComponent;
  let fixture: ComponentFixture<UsermapDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ UsermapDeleteDialogComponent ],
      providers: [UserMapService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermapDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
