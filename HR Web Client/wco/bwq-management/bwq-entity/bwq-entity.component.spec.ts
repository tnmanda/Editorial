import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwqEntityComponent } from './bwq-entity.component';

describe('BwqEntityComponent', () => {
  let component: BwqEntityComponent;
  let fixture: ComponentFixture<BwqEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BwqEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BwqEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
