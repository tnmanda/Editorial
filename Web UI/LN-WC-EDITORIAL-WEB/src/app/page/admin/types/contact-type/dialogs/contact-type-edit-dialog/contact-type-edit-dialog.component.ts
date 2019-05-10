import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ContactType } from '../../../../../../shared/models/admin/types/contact-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { ContactTypeService } from '../../../../../../shared/services/admin/types/contact-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-contact-type-edit-dialog',
  templateUrl: './contact-type-edit-dialog.component.html',
  styleUrls: ['./contact-type-edit-dialog.component.css']
})
export class ContactTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedContactType: ContactType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  contactTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private contactTypeSrv: ContactTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedContactType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedContactType.lastUpdatedUTC = new Date().toUTCString();

  this.contactTypeSrv.apiUrl = environment.contactType.root;
  this.contactTypeEditSubscription = this.contactTypeSrv.put(this.selectedContactType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedContactType.contactTypeName + ' successfully updated.' });

  this.selectedContactType = new ContactType();
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
    if (this.contactTypeEditSubscription) { this.contactTypeEditSubscription.unsubscribe(); }
  }

}
