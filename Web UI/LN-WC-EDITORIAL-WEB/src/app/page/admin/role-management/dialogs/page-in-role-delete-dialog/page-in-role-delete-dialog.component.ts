import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PageInUserRole } from '../../../../../shared/models/admin/page-in-user-role.model';
import { Subscription } from 'rxjs';
import { PageInUserRoleService } from '../../../../../shared/services/admin/page-in-user-role.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-page-in-role-delete-dialog',
  templateUrl: './page-in-role-delete-dialog.component.html',
  styleUrls: ['./page-in-role-delete-dialog.component.css']
})
export class PageInRoleDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedPageInRole: PageInUserRole;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  pageInRoleDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private pageInUserRoleSrv: PageInUserRoleService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    console.log(this.selectedPageInRole.pageInUserRoleID);
    this.pageInUserRoleSrv.apiUrl = environment.page_in_user_role.root;
    this.pageInRoleDeleteSubscription = this.pageInUserRoleSrv.delete(this.selectedPageInRole.pageInUserRoleID).subscribe(result => {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Page successfully removed.' });
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
    if (this.pageInRoleDeleteSubscription) { this.pageInRoleDeleteSubscription.unsubscribe(); }
  }

}
