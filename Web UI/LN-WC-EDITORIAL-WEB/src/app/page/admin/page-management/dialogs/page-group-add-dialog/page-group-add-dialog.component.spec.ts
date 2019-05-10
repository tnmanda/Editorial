import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupAddDialogComponent } from './page-group-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { PageGroupService } from 'src/app/shared/services/admin/page-group.service';
import { MessageService } from 'primeng/api';

describe('PageGroupAddDialogComponent', () => {
  let component: PageGroupAddDialogComponent;
  let fixture: ComponentFixture<PageGroupAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule, InputTextareaModule,
        FormsModule, ToastModule],
      declarations: [ PageGroupAddDialogComponent ],
      providers: [GlobalHelperService, PageGroupService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
