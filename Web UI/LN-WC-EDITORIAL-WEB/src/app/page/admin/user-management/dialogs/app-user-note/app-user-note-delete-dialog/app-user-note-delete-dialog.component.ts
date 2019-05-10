import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUserNote } from 'src/app/shared/models/admin/app_user/app-user-note.model';
import { Subscription } from 'rxjs';
import { AppUserNoteService } from 'src/app/shared/services/admin/app_user/app-user-note.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-note-delete-dialog',
  templateUrl: './app-user-note-delete-dialog.component.html',
  styleUrls: ['./app-user-note-delete-dialog.component.css']
})
export class AppUserNoteDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserNote: AppUserNote;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserNoteDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserNoteSrv: AppUserNoteService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserNoteSrv.apiUrl = environment.app_user.note.root;
    this.appUserNoteDeleteSubscription = this.appUserNoteSrv
    .delete(this.selectedAppUserNote.appUserNoteID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User note successfully deleted.' });
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
    if (this.appUserNoteDeleteSubscription) { this.appUserNoteDeleteSubscription.unsubscribe(); }
  }

}
