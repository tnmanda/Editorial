import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchKeywordEditDialogComponent } from './watch-keyword-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { MessageService } from 'primeng/api';

describe('WatchKeywordEditDialogComponent', () => {
  let component: WatchKeywordEditDialogComponent;
  let fixture: ComponentFixture<WatchKeywordEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule,
        FormsModule],
      declarations: [ WatchKeywordEditDialogComponent ],
      providers: [WatchKeywordService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchKeywordEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
