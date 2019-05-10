import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { AbsenceType } from '../../../../../../shared/models/admin/types/absence-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AbsenceTypeService } from '../../../../../../shared/services/admin/types/absence-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-absence-type-edit-dialog',
  templateUrl: './absence-type-edit-dialog.component.html',
  styleUrls: ['./absence-type-edit-dialog.component.css']
})
export class AbsenceTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAbsenceType: AbsenceType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  absenceTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private absenceTypeSrv: AbsenceTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.selectedAbsenceType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.selectedAbsenceType.lastUpdatedUTC = new Date().toUTCString();

    this.absenceTypeSrv.apiUrl = environment.absenceType.root;
    this.absenceTypeDeleteSubscription = this.absenceTypeSrv.put(this.selectedAbsenceType).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedAbsenceType.absenceTypeName + ' successfully updated.' });

      this.selectedAbsenceType = new AbsenceType();
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
    if (this.absenceTypeDeleteSubscription) { this.absenceTypeDeleteSubscription.unsubscribe(); }
  }

}
