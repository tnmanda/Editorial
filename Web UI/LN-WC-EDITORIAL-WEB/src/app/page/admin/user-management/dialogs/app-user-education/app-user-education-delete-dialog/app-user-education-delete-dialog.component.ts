import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUserEducation } from 'src/app/shared/models/admin/app_user/app-user-education.model';
import { Subscription } from 'rxjs';
import { AppUserEducationService } from 'src/app/shared/services/admin/app_user/app-user-education.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-education-delete-dialog',
  templateUrl: './app-user-education-delete-dialog.component.html',
  styleUrls: ['./app-user-education-delete-dialog.component.css']
})
export class AppUserEducationDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserEducation: AppUserEducation;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserEducationDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserEducationSrv: AppUserEducationService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserEducationSrv.apiUrl = environment.app_user.education.root;
    this.appUserEducationDeleteSubscription = this.appUserEducationSrv
    .delete(this.selectedAppUserEducation.appUserEducationID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Education successfully deleted.' });
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
    if (this.appUserEducationDeleteSubscription) { this.appUserEducationDeleteSubscription.unsubscribe(); }
  }

}
