import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PageGroup } from '../../../../../shared/models/admin/page-group.model';
import { Subscription } from 'rxjs';
import { PageGroupService } from '../../../../../shared/services/admin/page-group.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-page-group-delete-dialog',
  templateUrl: './page-group-delete-dialog.component.html',
  styleUrls: ['./page-group-delete-dialog.component.css']
})
export class PageGroupDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedPageGroup: PageGroup;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  pageGroupDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private pageGroupSrv: PageGroupService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.pageGroupSrv.apiUrl = environment.page_management.page_group.root;
  this.pageGroupDeleteSubscription = this.pageGroupSrv.delete(this.selectedPageGroup.pagesGroupsID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: this.selectedPageGroup.pagesGroupsName + ' successfully deleted.' });
  this.onClose();
  }, error => {
    // tslint:disable-next-line:quotemark
    this.messageService.add({severity: 'error', summary: '', detail: "Group with existing pages can't be deleted."});
    this.onClose();
    this.errorMessage = error;
  });
  }

  onClose() {
  this.displayChange.emit(false);
  this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
   if (this.pageGroupDeleteSubscription) { this.pageGroupDeleteSubscription.unsubscribe(); }
  }

}
