import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Status } from 'src/app/shared/models/investigation/status.model';
import { Subscription } from 'rxjs';
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status-delete-dialog',
  templateUrl: './status-delete-dialog.component.html',
  styleUrls: ['./status-delete-dialog.component.css']
})
export class StatusDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedStatus: Status;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  statusDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private statusSrv: StatusService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.statusSrv.apiUrl = environment.investigation_management.status.root;
    this.statusDeleteSubscription = this.statusSrv.delete(this.selectedStatus.investigationStatusID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Status successfully deleted.' });
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
    if (this.statusDeleteSubscription) { this.statusDeleteSubscription.unsubscribe(); }
  }


}
