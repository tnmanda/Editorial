import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageType } from '../../../../../../shared/models/admin/types/language-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { LanguageTypeService } from '../../../../../../shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-language-type-add-dialog',
  templateUrl: './language-type-add-dialog.component.html',
  styleUrls: ['./language-type-add-dialog.component.css']
})
export class LanguageTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  languageType: LanguageType;
  languageTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private languageTypeSrv: LanguageTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.languageType = new LanguageType();
  }

  onSave() {
  this.languageType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.languageType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.languageType.dateCreatedUTC = new Date().toUTCString();
  this.languageType.lastUpdatedUTC = new Date().toUTCString();

  this.languageTypeSrv.apiUrl = environment.languageType.root;
  this.languageTypeAddSubscription = this.languageTypeSrv.post(this.languageType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.languageType.languageTypeName + ' successfully created.' });

  this.languageType = new LanguageType();
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
    if (this.languageTypeAddSubscription) { this.languageTypeAddSubscription.unsubscribe(); }
  }

}
