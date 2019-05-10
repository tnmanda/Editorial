import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { InvestigationActivity } from '../../../../shared/models/investigation-activity.model';

@Component({
  selector: 'hr-activity-logs-dialog',
  templateUrl: './activity-logs-dialog.component.html',
  styleUrls: ['./activity-logs-dialog.component.css']
})
export class ActivityLogsDialogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tableColumns: string[] = ['Date', 'Event', 'CreatedBy'];
  investigationActivities: InvestigationActivity[];
  dataSource: MatTableDataSource<InvestigationActivity>;

  constructor(public dialogRef: MatDialogRef<ActivityLogsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _investigationActivities: InvestigationActivity[]) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<InvestigationActivity>(this._investigationActivities);
    this.dataSource.paginator = this.paginator;
  }

}
