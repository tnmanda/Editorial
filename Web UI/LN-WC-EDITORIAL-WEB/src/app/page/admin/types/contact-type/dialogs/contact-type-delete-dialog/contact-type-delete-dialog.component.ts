import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ContactType } from '../../../../../../shared/models/admin/types/contact-type.model';
import { Subscription } from 'rxjs';
import { ContactTypeService } from '../../../../../../shared/services/admin/types/contact-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-contact-type-delete-dialog',
  templateUrl: './contact-type-delete-dialog.component.html',
  styleUrls: ['./contact-type-delete-dialog.component.css']
})
export class ContactTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedContactType: ContactType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  contactTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private contactTypeSrv: ContactTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.contactTypeSrv.apiUrl = environment.contactType.root;
  this.contactTypeDeleteSubscription = this.contactTypeSrv.delete(this.selectedContactType.contactTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedContactType.contactTypeName + ' successfully deleted.' });
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
    if (this.contactTypeDeleteSubscription) { this.contactTypeDeleteSubscription.unsubscribe(); }
  }

}
