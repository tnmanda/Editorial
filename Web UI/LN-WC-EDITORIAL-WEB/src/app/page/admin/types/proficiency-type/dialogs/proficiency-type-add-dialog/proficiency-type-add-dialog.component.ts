import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProficiencyType } from '../../../../../../shared/models/admin/types/proficiency-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { ProficiencyTypeService } from '../../../../../../shared/services/admin/types/proficiency-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-proficiency-type-add-dialog',
  templateUrl: './proficiency-type-add-dialog.component.html',
  styleUrls: ['./proficiency-type-add-dialog.component.css']
})
export class ProficiencyTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  proficiencyType: ProficiencyType;
  proficiencyTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private proficiencyTypeSrv: ProficiencyTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.proficiencyType = new ProficiencyType();
  }

  onSave() {
  this.proficiencyType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.proficiencyType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.proficiencyType.dateCreatedUTC = new Date().toUTCString();
  this.proficiencyType.lastUpdatedUTC = new Date().toUTCString();

  this.proficiencyTypeSrv.apiUrl = environment.proficiencyType.root;
  this.proficiencyTypeAddSubscription = this.proficiencyTypeSrv.post(this.proficiencyType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.proficiencyType.proficiencyTypeName + ' successfully created.' });

  this.proficiencyType = new ProficiencyType();
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
    if (this.proficiencyTypeAddSubscription) { this.proficiencyTypeAddSubscription.unsubscribe(); }
  }

}
