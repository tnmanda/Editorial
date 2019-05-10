import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationEntityComponent } from './investigation-entity.component';

describe('InvestigationEntityComponent', () => {
  let component: InvestigationEntityComponent;
  let fixture: ComponentFixture<InvestigationEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
