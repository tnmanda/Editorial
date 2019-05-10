import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { EducationType } from '../../../../../../shared/models/admin/types/education-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { EducationTypeService } from '../../../../../../shared/services/admin/types/education-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-education-type-edit-dialog',
  templateUrl: './education-type-edit-dialog.component.html',
  styleUrls: ['./education-type-edit-dialog.component.css']
})
export class EducationTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedEducationType: EducationType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  educationTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private educationTypeSrv: EducationTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedEducationType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedEducationType.lastUpdatedUTC = new Date().toUTCString();

  this.educationTypeSrv.apiUrl = environment.educationType.root;
  this.educationTypeEditSubscription = this.educationTypeSrv.put(this.selectedEducationType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedEducationType.educationName + ' successfully updated.' });

  this.selectedEducationType = new EducationType();
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
  if (this.educationTypeEditSubscription) { this.educationTypeEditSubscription.unsubscribe(); }
  }


}
