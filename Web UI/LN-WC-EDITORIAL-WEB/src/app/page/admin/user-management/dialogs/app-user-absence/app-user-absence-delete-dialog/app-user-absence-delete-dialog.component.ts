import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserAbsence } from '../../../../../../shared/models/admin/app_user/app-user-absence.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserAbsenceService } from '../../../../../../shared/services/admin/app_user/app-user-absence.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-absence-delete-dialog',
  templateUrl: './app-user-absence-delete-dialog.component.html',
  styleUrls: ['./app-user-absence-delete-dialog.component.css']
})
export class AppUserAbsenceDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserAbsence: AppUserAbsence;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserAbsenceDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserAbsenceSrv: AppUserAbsenceService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserAbsenceSrv.apiUrl = environment.app_user.absence.root;
    this.appUserAbsenceDeleteSubscription = this.appUserAbsenceSrv.delete(this.selectedAppUserAbsence.appUserAbsenceID)
    .subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Address successfully deleted.' });
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
    if (this.appUserAbsenceDeleteSubscription) { this.appUserAbsenceDeleteSubscription.unsubscribe(); }
  }

}
