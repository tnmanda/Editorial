import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Page } from '../../../../../shared/models/admin/page.model';
import { Subscription } from 'rxjs';
import { PageService } from '../../../../../shared/services/admin/page.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-page-delete-dialog',
  templateUrl: './page-delete-dialog.component.html',
  styleUrls: ['./page-delete-dialog.component.css']
})
export class PageDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedPage: Page;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  pageDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private pageSrv: PageService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.pageSrv.apiUrl = environment.page_management.page.root;
  this.pageDeleteSubscription = this.pageSrv.delete(this.selectedPage.pagesID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: this.selectedPage.pageName + ' successfully deleted.' });
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
    if (this.pageDeleteSubscription) { this.pageDeleteSubscription.unsubscribe(); }
  }

}
