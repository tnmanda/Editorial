import { Component, OnInit, EventEmitter, OnDestroy, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactType } from '../../../../../../shared/models/admin/types/contact-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { ContactTypeService } from '../../../../../../shared/services/admin/types/contact-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-contact-type-add-dialog',
  templateUrl: './contact-type-add-dialog.component.html',
  styleUrls: ['./contact-type-add-dialog.component.css']
})
export class ContactTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  contactType: ContactType;
  contactTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private contactTypeSrv: ContactTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.contactType = new ContactType();
  }

  onSave() {
  this.contactType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.contactType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.contactType.dateCreatedUTC = new Date().toUTCString();
  this.contactType.lastUpdatedUTC = new Date().toUTCString();

  this.contactTypeSrv.apiUrl = environment.contactType.root;
  this.contactTypeAddSubscription = this.contactTypeSrv.post(this.contactType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.contactType.contactTypeName + ' successfully created.' });

  this.contactType = new ContactType();
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
    if (this.contactTypeAddSubscription) { this.contactTypeAddSubscription.unsubscribe(); }
  }

}
