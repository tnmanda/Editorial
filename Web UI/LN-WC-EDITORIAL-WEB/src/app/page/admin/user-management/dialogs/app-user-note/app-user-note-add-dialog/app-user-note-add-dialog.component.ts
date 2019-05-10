import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserNote } from 'src/app/shared/models/admin/app_user/app-user-note.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserNoteService } from 'src/app/shared/services/admin/app_user/app-user-note.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-note-add-dialog',
  templateUrl: './app-user-note-add-dialog.component.html',
  styleUrls: ['./app-user-note-add-dialog.component.css']
})
export class AppUserNoteAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  appUserNote: AppUserNote;
  appUserNoteAddSubscription: Subscription;

  appUserNoteForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserNoteForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
    private appUserNoteSrv: AppUserNoteService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.appUserNoteForm = new FormGroup ({
      'notes' : new FormControl('', Validators.required),
    });
  }

  onSave(appUserNoteForm) {
    this.isSubmitted = true;
    if (appUserNoteForm.valid) {
      this.appUserNote = appUserNoteForm.value;
      this.appUserNote.appUserID = this.selectedAppUser.appUserID;
      this.appUserNote.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserNote.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserNote.dateCreatedUTC = new Date().toUTCString();
      this.appUserNote.lastUpdatedUTC = new Date().toUTCString();

      this.appUserNoteSrv.apiUrl = environment.app_user.note.root;
      this.appUserNoteAddSubscription = this.appUserNoteSrv.post(this.appUserNote).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'User note successfully created.' });

        this.appUserNote = new AppUserNote();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.appUserNoteForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserNoteAddSubscription) { this.appUserNoteAddSubscription.unsubscribe(); }
  }


}
