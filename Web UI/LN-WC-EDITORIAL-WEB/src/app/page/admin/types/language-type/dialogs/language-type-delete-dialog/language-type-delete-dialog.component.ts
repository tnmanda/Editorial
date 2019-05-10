import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LanguageType } from '../../../../../../shared/models/admin/types/language-type.model';
import { Subscription } from 'rxjs';
import { LanguageTypeService } from '../../../../../../shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-language-type-delete-dialog',
  templateUrl: './language-type-delete-dialog.component.html',
  styleUrls: ['./language-type-delete-dialog.component.css']
})
export class LanguageTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedLanguageType: LanguageType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  languageTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private languageTypeSrv: LanguageTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.languageTypeSrv.apiUrl = environment.languageType.root;
    this.languageTypeDeleteSubscription = this.languageTypeSrv.delete(this.selectedLanguageType.languageTypeID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.selectedLanguageType.languageTypeName + ' successfully deleted.' });
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
    if (this.languageTypeDeleteSubscription) { this.languageTypeDeleteSubscription.unsubscribe(); }
  }

}
