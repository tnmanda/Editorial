import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogsDialogComponent } from './activity-logs-dialog.component';

describe('ActivityLogsDialogComponent', () => {
  let component: ActivityLogsDialogComponent;
  let fixture: ComponentFixture<ActivityLogsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLogsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
