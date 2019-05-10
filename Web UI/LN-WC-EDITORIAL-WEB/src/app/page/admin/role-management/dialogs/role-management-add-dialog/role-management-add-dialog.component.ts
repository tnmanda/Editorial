import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoleType } from '../../../../../shared/models/admin/types/role-type.model';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { RoleTypeService } from '../../../../../shared/services/admin/types/role-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-role-management-add-dialog',
  templateUrl: './role-management-add-dialog.component.html',
  styleUrls: ['./role-management-add-dialog.component.css']
})
export class RoleManagementAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  roleType: RoleType;
  roleTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private roleTypeSrv: RoleTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.roleType = new RoleType();
  }

  onSave() {
  this.roleType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.roleType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.roleType.dateCreatedUTC = new Date().toUTCString();
  this.roleType.lastUpdatedUTC = new Date().toUTCString();

  this.roleTypeSrv.apiUrl = environment.roleType.root;
  this.roleTypeAddSubscription = this.roleTypeSrv.post(this.roleType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.roleType.roleTypeName + ' successfully created.' });

  this.roleType = new RoleType();
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
   if (this.roleTypeAddSubscription) { this.roleTypeAddSubscription.unsubscribe(); }
  }
}
