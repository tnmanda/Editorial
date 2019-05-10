import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeleteDialogComponent } from './page-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PageService } from 'src/app/shared/services/admin/page.service';
import { MessageService } from 'primeng/api';

describe('PageDeleteDialogComponent', () => {
  let component: PageDeleteDialogComponent;
  let fixture: ComponentFixture<PageDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ PageDeleteDialogComponent ],
      providers: [PageService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
