import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwqEntityEditComponent } from './bwq-entity-edit.component';

describe('BwqEntityEditComponent', () => {
  let component: BwqEntityEditComponent;
  let fixture: ComponentFixture<BwqEntityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BwqEntityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BwqEntityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
