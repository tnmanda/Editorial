import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDeleteDialogComponent } from './watch-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { WatchService } from 'src/app/shared/services/news/watch.service';
import { MessageService } from 'primeng/api';

describe('WatchDeleteDialogComponent', () => {
  let component: WatchDeleteDialogComponent;
  let fixture: ComponentFixture<WatchDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ WatchDeleteDialogComponent ],
      providers: [WatchService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
