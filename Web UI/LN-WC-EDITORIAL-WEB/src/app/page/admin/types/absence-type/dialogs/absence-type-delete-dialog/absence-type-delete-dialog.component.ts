import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AbsenceType } from '../../../../../../shared/models/admin/types/absence-type.model';
import { Subscription } from 'rxjs';
import { AbsenceTypeService } from '../../../../../../shared/services/admin/types/absence-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-absence-type-delete-dialog',
  templateUrl: './absence-type-delete-dialog.component.html',
  styleUrls: ['./absence-type-delete-dialog.component.css']
})
export class AbsenceTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAbsenceType: AbsenceType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  absenceTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private absenceTypeSrv: AbsenceTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.absenceTypeSrv.apiUrl = environment.absenceType.root;
    this.absenceTypeDeleteSubscription = this.absenceTypeSrv.delete(this.selectedAbsenceType.absenceTypeID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedAbsenceType.absenceTypeName + ' successfully deleted.' });
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
    if (this.absenceTypeDeleteSubscription) { this.absenceTypeDeleteSubscription.unsubscribe(); }
  }

}
