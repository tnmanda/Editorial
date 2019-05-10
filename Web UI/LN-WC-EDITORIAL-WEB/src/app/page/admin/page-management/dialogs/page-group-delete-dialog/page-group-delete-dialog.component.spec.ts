import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupDeleteDialogComponent } from './page-group-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PageGroupService } from 'src/app/shared/services/admin/page-group.service';
import { MessageService } from 'primeng/api';

describe('PageGroupDeleteDialogComponent', () => {
  let component: PageGroupDeleteDialogComponent;
  let fixture: ComponentFixture<PageGroupDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ PageGroupDeleteDialogComponent ],
      providers: [PageGroupService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
