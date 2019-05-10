import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Disposition } from 'src/app/shared/models/investigation/disposition.model';
import { Subscription } from 'rxjs';
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disposition-delete-dialog',
  templateUrl: './disposition-delete-dialog.component.html',
  styleUrls: ['./disposition-delete-dialog.component.css']
})
export class DispositionDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedDisposition: Disposition;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  dispositionDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private dispositionSrv: DispositionService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.dispositionSrv.apiUrl = environment.investigation_management.disposition.root;
    this.dispositionDeleteSubscription = this.dispositionSrv.delete(this.selectedDisposition.investigationDispositionsID)
    .subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Disposition successfully deleted.' });
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
    if (this.dispositionDeleteSubscription) { this.dispositionDeleteSubscription.unsubscribe(); }
  }


}
