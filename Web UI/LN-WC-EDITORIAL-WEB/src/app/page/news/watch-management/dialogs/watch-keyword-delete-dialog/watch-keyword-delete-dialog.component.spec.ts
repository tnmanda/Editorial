import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchKeywordDeleteDialogComponent } from './watch-keyword-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';

describe('WatchKeywordDeleteDialogComponent', () => {
  let component: WatchKeywordDeleteDialogComponent;
  let fixture: ComponentFixture<WatchKeywordDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ WatchKeywordDeleteDialogComponent ],
      providers: [WatchKeywordService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchKeywordDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
