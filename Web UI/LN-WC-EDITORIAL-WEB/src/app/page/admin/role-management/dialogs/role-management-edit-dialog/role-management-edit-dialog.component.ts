import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RoleType } from '../../../../../shared/models/admin/types/role-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { RoleTypeService } from '../../../../../shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-role-management-edit-dialog',
  templateUrl: './role-management-edit-dialog.component.html',
  styleUrls: ['./role-management-edit-dialog.component.css']
})
export class RoleManagementEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedRoleType: RoleType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  roleTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private roleTypeSrv: RoleTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.selectedRoleType.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.selectedRoleType.lastUpdatedUTC = new Date().toUTCString();

    this.roleTypeSrv.apiUrl = environment.roleType.root;
    this.roleTypeEditSubscription = this.roleTypeSrv.put(this.selectedRoleType).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.selectedRoleType.roleTypeName + ' successfully updated.' });

    this.selectedRoleType = new RoleType();
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
    if (this.roleTypeEditSubscription) { this.roleTypeEditSubscription.unsubscribe(); }
  }

}
