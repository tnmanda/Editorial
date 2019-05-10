import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsQueueComponent } from './alerts-queue.component';

describe('AlertsQueueComponent', () => {
  let component: AlertsQueueComponent;
  let fixture: ComponentFixture<AlertsQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
