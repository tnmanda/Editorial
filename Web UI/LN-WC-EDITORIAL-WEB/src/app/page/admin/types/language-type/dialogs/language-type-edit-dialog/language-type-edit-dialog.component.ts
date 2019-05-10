import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageType } from '../../../../../../shared/models/admin/types/language-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { LanguageTypeService } from '../../../../../../shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-language-type-edit-dialog',
  templateUrl: './language-type-edit-dialog.component.html',
  styleUrls: ['./language-type-edit-dialog.component.css']
})
export class LanguageTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedLanguageType: LanguageType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  languageTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private languageTypeSrv: LanguageTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedLanguageType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedLanguageType.lastUpdatedUTC = new Date().toUTCString();

  this.languageTypeSrv.apiUrl = environment.languageType.root;
  this.languageTypeEditSubscription = this.languageTypeSrv.put(this.selectedLanguageType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedLanguageType.languageTypeName + ' successfully updated.' });

  this.selectedLanguageType = new LanguageType();
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
    if (this.languageTypeEditSubscription) { this.languageTypeEditSubscription.unsubscribe(); }
  }


}
