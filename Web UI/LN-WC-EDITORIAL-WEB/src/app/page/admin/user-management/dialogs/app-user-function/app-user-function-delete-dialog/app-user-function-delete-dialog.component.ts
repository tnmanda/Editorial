import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUserFunction } from 'src/app/shared/models/admin/app_user/app-user-function.model';
import { Subscription } from 'rxjs';
import { AppUserFunctionService } from 'src/app/shared/services/admin/app_user/app-user-function.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-function-delete-dialog',
  templateUrl: './app-user-function-delete-dialog.component.html',
  styleUrls: ['./app-user-function-delete-dialog.component.css']
})
export class AppUserFunctionDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUserFunction: AppUserFunction;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserFunctionDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private appUserFunctionSrv: AppUserFunctionService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.appUserFunctionSrv.apiUrl = environment.app_user.function.root;
    this.appUserFunctionDeleteSubscription = this.appUserFunctionSrv.delete(this.selectedAppUserFunction.appUserFunctionID)
    .subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User function successfully deleted.' });
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
    if (this.appUserFunctionDeleteSubscription) { this.appUserFunctionDeleteSubscription.unsubscribe(); }
  }

}
