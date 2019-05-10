import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GenderType } from '../../../../../../shared/models/admin/types/gender-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { GenderTypeService } from '../../../../../../shared/services/admin/types/gender-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-gender-type-edit-dialog',
  templateUrl: './gender-type-edit-dialog.component.html',
  styleUrls: ['./gender-type-edit-dialog.component.css']
})
export class GenderTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedGenderType: GenderType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  genderTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private genderTypeSrv: GenderTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedGenderType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedGenderType.lastUpdatedUTC = new Date().toUTCString();

  this.genderTypeSrv.apiUrl = environment.genderType.root;
  this.genderTypeEditSubscription = this.genderTypeSrv.put(this.selectedGenderType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedGenderType.genderTypeName + ' successfully updated.' });

  this.selectedGenderType = new GenderType();
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
    if (this.genderTypeEditSubscription) { this.genderTypeEditSubscription.unsubscribe(); }
  }

}
