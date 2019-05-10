import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProficiencyType } from '../../../../../../shared/models/admin/types/proficiency-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { ProficiencyTypeService } from '../../../../../../shared/services/admin/types/proficiency-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-proficiency-type-edit-dialog',
  templateUrl: './proficiency-type-edit-dialog.component.html',
  styleUrls: ['./proficiency-type-edit-dialog.component.css']
})
export class ProficiencyTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedProficiencyType: ProficiencyType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  proficiencyTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private proficiencyTypeSrv: ProficiencyTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedProficiencyType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedProficiencyType.lastUpdatedUTC = new Date().toUTCString();

  this.proficiencyTypeSrv.apiUrl = environment.proficiencyType.root;
  this.proficiencyTypeEditSubscription = this.proficiencyTypeSrv.put(this.selectedProficiencyType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedProficiencyType.proficiencyTypeName + ' successfully updated.' });

  this.selectedProficiencyType = new ProficiencyType();
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
    if (this.proficiencyTypeEditSubscription) { this.proficiencyTypeEditSubscription.unsubscribe(); }
  }

}
