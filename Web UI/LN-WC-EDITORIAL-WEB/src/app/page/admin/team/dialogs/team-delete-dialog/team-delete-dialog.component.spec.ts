import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeleteDialogComponent } from './team-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TeamService } from 'src/app/shared/services/admin/team.service';
import { MessageService } from 'primeng/api';

describe('TeamDeleteDialogComponent', () => {
  let component: TeamDeleteDialogComponent;
  let fixture: ComponentFixture<TeamDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ TeamDeleteDialogComponent ],
      providers: [TeamService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
