import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvestigationNote } from '../../../../shared/models/investigation-note.model';

@Component({
  selector: 'hr-investigation-note-list-dialog',
  templateUrl: './investigation-note-list-dialog.component.html',
  styleUrls: ['./investigation-note-list-dialog.component.css']
})
export class InvestigationNoteListDialogComponent implements OnInit {

  tableColumns: string[] = ['Date', 'Event', 'CreatedBy'];
  notes: InvestigationNote[];

  constructor(public dialogRef: MatDialogRef<InvestigationNoteListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public invNotes: InvestigationNote[]) { }

  ngOnInit() {
    this.notes = this.invNotes;
  }

}
