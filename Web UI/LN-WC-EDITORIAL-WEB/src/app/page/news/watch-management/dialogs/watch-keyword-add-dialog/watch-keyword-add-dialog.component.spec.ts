import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchKeywordAddDialogComponent } from './watch-keyword-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { MessageService } from 'primeng/api';

describe('WatchKeywordAddDialogComponent', () => {
  let component: WatchKeywordAddDialogComponent;
  let fixture: ComponentFixture<WatchKeywordAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule,
        FormsModule],
      declarations: [ WatchKeywordAddDialogComponent ],
      providers: [WatchKeywordService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchKeywordAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
