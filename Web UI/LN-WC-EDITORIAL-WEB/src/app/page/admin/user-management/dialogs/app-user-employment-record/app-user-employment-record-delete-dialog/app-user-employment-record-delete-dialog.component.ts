import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUserEmploymentRecord } from 'src/app/shared/models/admin/app_user/app-user-employment-record.model';
import { Subscription } from 'rxjs';
import { AppUserEmploymentRecordService } from 'src/app/shared/services/admin/app_user/app-user-employment-record.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-employment-record-delete-dialog',
  templateUrl: './app-user-employment-record-delete-dialog.component.html',
  styleUrls: ['./app-user-employment-record-delete-dialog.component.css']
})
export class AppUserEmploymentRecordDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserEmploymentRecord: AppUserEmploymentRecord;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserEmploymentRecordDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserEmploymentRecordSrv: AppUserEmploymentRecordService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserEmploymentRecordSrv.apiUrl = environment.app_user.employment_record.root;
    this.appUserEmploymentRecordDeleteSubscription = this.appUserEmploymentRecordSrv
    .delete(this.selectedAppUserEmploymentRecord.appUserEmploymentRecordID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Employment Record successfully deleted.' });
    this.onClose();
    }, error => { this.errorMessage = error; });
  }

  onClose() {
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserEmploymentRecordDeleteSubscription) { this.appUserEmploymentRecordDeleteSubscription.unsubscribe(); }
  }

}
