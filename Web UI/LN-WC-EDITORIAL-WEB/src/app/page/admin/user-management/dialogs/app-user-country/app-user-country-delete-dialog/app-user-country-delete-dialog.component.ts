import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserCountry } from 'src/app/shared/models/admin/app_user/app-user-country.model';
import { Subscription } from 'rxjs';
import { AppUserCountryService } from 'src/app/shared/services/admin/app_user/app-user-country.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-country-delete-dialog',
  templateUrl: './app-user-country-delete-dialog.component.html',
  styleUrls: ['./app-user-country-delete-dialog.component.css']
})
export class AppUserCountryDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserCountry: AppUserCountry;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserCountryDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserCountrySrv: AppUserCountryService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserCountrySrv.apiUrl = environment.app_user.country.root;
    this.appUserCountryDeleteSubscription = this.appUserCountrySrv
    .delete(this.selectedAppUserCountry.appUserCountryID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User country successfully deleted.' });
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
    if (this.appUserCountryDeleteSubscription) { this.appUserCountryDeleteSubscription.unsubscribe(); }
  }


}
