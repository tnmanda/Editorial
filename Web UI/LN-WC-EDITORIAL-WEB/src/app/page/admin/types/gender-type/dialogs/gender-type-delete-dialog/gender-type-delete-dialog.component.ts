import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GenderType } from '../../../../../../shared/models/admin/types/gender-type.model';
import { Subscription } from 'rxjs';
import { GenderTypeService } from '../../../../../../shared/services/admin/types/gender-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-gender-type-delete-dialog',
  templateUrl: './gender-type-delete-dialog.component.html',
  styleUrls: ['./gender-type-delete-dialog.component.css']
})
export class GenderTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedGenderType: GenderType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  genderTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private genderTypeSrv: GenderTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.genderTypeSrv.apiUrl = environment.genderType.root;
  this.genderTypeDeleteSubscription = this.genderTypeSrv.delete(this.selectedGenderType.genderTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedGenderType.genderTypeName + ' successfully deleted.' });
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
    if (this.genderTypeDeleteSubscription) { this.genderTypeDeleteSubscription.unsubscribe(); }
  }

}
