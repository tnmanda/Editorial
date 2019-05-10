import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserLanguage } from 'src/app/shared/models/admin/app_user/app-user-language.model';
import { Subscription } from 'rxjs';
import { AppUserLanguageService } from 'src/app/shared/services/admin/app_user/app-user-language.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-language-delete-dialog',
  templateUrl: './app-user-language-delete-dialog.component.html',
  styleUrls: ['./app-user-language-delete-dialog.component.css']
})
export class AppUserLanguageDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserLanguage: AppUserLanguage;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserLanguageDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserLanguageSrv: AppUserLanguageService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserLanguageSrv.apiUrl = environment.app_user.language.root;
    this.appUserLanguageDeleteSubscription = this.appUserLanguageSrv
    .delete(this.selectedAppUserLanguage.appUserLanguageID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User language successfully deleted.' });
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
    if (this.appUserLanguageDeleteSubscription) { this.appUserLanguageDeleteSubscription.unsubscribe(); }
  }


}
