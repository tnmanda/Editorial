import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RoleType } from '../../../../../shared/models/admin/types/role-type.model';
import { Subscription } from 'rxjs';
import { RoleTypeService } from '../../../../../shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-role-management-delete-dialog',
  templateUrl: './role-management-delete-dialog.component.html',
  styleUrls: ['./role-management-delete-dialog.component.css']
})
export class RoleManagementDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedRoleType: RoleType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  roleTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private roleTypeSrv: RoleTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.roleTypeSrv.apiUrl = environment.roleType.root;
    this.roleTypeDeleteSubscription = this.roleTypeSrv.delete(this.selectedRoleType.roleTypeID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.selectedRoleType.roleTypeName + ' successfully deleted.' });
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
    if (this.roleTypeDeleteSubscription) { this.roleTypeDeleteSubscription.unsubscribe(); }
  }

}
