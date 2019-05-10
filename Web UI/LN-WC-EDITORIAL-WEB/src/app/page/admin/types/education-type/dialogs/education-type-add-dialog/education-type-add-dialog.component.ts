import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { EducationType } from '../../../../../../shared/models/admin/types/education-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { EducationTypeService } from '../../../../../../shared/services/admin/types/education-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-education-type-add-dialog',
  templateUrl: './education-type-add-dialog.component.html',
  styleUrls: ['./education-type-add-dialog.component.css']
})
export class EducationTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  educationType: EducationType;
  educationTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private educationTypeSrv: EducationTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.educationType = new EducationType();
  }

  onSave() {
  this.educationType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.educationType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.educationType.dateCreatedUTC = new Date().toUTCString();
  this.educationType.lastUpdatedUTC = new Date().toUTCString();

  this.educationTypeSrv.apiUrl = environment.educationType.root;
  this.educationTypeAddSubscription = this.educationTypeSrv.post(this.educationType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.educationType.educationName + ' successfully created.' });

  this.educationType = new EducationType();
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
  if (this.educationTypeAddSubscription) { this.educationTypeAddSubscription.unsubscribe(); }
  }

}
