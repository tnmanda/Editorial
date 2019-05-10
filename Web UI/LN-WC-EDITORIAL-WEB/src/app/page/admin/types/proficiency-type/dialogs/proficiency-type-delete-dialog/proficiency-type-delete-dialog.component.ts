import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProficiencyType } from '../../../../../../shared/models/admin/types/proficiency-type.model';
import { Subscription } from 'rxjs';
import { ProficiencyTypeService } from '../../../../../../shared/services/admin/types/proficiency-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-proficiency-type-delete-dialog',
  templateUrl: './proficiency-type-delete-dialog.component.html',
  styleUrls: ['./proficiency-type-delete-dialog.component.css']
})
export class ProficiencyTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedProficiencyType: ProficiencyType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  proficiencyTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private proficiencyTypeSrv: ProficiencyTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.proficiencyTypeSrv.apiUrl = environment.proficiencyType.root;
  this.proficiencyTypeDeleteSubscription = this.proficiencyTypeSrv.delete(this.selectedProficiencyType.proficiencyTypeID)
  .subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedProficiencyType.proficiencyTypeName + ' successfully deleted.' });
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
    if (this.proficiencyTypeDeleteSubscription) { this.proficiencyTypeDeleteSubscription.unsubscribe(); }
  }

}
