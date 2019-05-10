import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { EducationType } from '../../../../../../shared/models/admin/types/education-type.model';
import { Subscription } from 'rxjs';
import { EducationTypeService } from '../../../../../../shared/services/admin/types/education-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-education-type-delete-dialog',
  templateUrl: './education-type-delete-dialog.component.html',
  styleUrls: ['./education-type-delete-dialog.component.css']
})
export class EducationTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedEducationType: EducationType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  educationTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private educationTypeSrv: EducationTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.educationTypeSrv.apiUrl = environment.educationType.root;
  this.educationTypeDeleteSubscription = this.educationTypeSrv.delete(this.selectedEducationType.educationTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedEducationType.educationName + ' successfully deleted.' });
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
    if (this.educationTypeDeleteSubscription) { this.educationTypeDeleteSubscription.unsubscribe(); }
  }

}
