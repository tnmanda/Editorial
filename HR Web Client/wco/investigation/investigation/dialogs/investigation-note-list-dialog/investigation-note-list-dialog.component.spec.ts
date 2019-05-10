import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationNoteListDialogComponent } from './investigation-note-list-dialog.component';

describe('InvestigationNoteListDialogComponent', () => {
  let component: InvestigationNoteListDialogComponent;
  let fixture: ComponentFixture<InvestigationNoteListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationNoteListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationNoteListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
