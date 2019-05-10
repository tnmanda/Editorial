import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsQueueComponent } from './news-queue.component';

describe('NewsQueueComponent', () => {
  let component: NewsQueueComponent;
  let fixture: ComponentFixture<NewsQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
