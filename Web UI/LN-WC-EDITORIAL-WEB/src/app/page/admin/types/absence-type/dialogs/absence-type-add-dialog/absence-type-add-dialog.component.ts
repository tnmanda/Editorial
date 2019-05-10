import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AbsenceType } from '../../../../../../shared/models/admin/types/absence-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AbsenceTypeService } from '../../../../../../shared/services/admin/types/absence-type.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-absence-type-add-dialog',
  templateUrl: './absence-type-add-dialog.component.html',
  styleUrls: ['./absence-type-add-dialog.component.css']
})
export class AbsenceTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  absenceType: AbsenceType;
  absenceTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private absenceTypeSrv: AbsenceTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.absenceType = new AbsenceType();
  }

  onSave() {
    this.absenceType.createdBy = this.globalHelperSrv.getCurrentUser();
    this.absenceType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.absenceType.dateCreatedUTC = new Date().toUTCString();
    this.absenceType.lastUpdatedUTC = new Date().toUTCString();

    this.absenceTypeSrv.apiUrl = environment.absenceType.root;
    this.absenceTypeAddSubscription = this.absenceTypeSrv.post(this.absenceType).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.absenceType.absenceTypeName + ' successfully created.' });

      this.absenceType = new AbsenceType();
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
    if (this.absenceTypeAddSubscription) { this.absenceTypeAddSubscription.unsubscribe(); }
  }

}
