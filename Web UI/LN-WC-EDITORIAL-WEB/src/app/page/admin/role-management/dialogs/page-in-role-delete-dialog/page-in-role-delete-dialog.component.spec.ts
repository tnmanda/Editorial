import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInRoleDeleteDialogComponent } from './page-in-role-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PageInUserRoleService } from 'src/app/shared/services/admin/page-in-user-role.service';
import { MessageService } from 'primeng/api';

describe('PageInRoleDeleteDialogComponent', () => {
  let component: PageInRoleDeleteDialogComponent;
  let fixture: ComponentFixture<PageInRoleDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ PageInRoleDeleteDialogComponent ],
      providers: [PageInUserRoleService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInRoleDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
