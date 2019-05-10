import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { GenderType } from '../../../../../../shared/models/admin/types/gender-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { GenderTypeService } from '../../../../../../shared/services/admin/types/gender-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-gender-type-add-dialog',
  templateUrl: './gender-type-add-dialog.component.html',
  styleUrls: ['./gender-type-add-dialog.component.css']
})
export class GenderTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  genderType: GenderType;
  genderTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private genderTypeSrv: GenderTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.genderType = new GenderType();
  }

  onSave() {
  this.genderType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.genderType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.genderType.dateCreatedUTC = new Date().toUTCString();
  this.genderType.lastUpdatedUTC = new Date().toUTCString();

  this.genderTypeSrv.apiUrl = environment.genderType.root;
  this.genderTypeAddSubscription = this.genderTypeSrv.post(this.genderType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.genderType.genderTypeName + ' successfully created.' });

  this.genderType = new GenderType();
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
    if (this.genderTypeAddSubscription) { this.genderTypeAddSubscription.unsubscribe(); }
  }

}
