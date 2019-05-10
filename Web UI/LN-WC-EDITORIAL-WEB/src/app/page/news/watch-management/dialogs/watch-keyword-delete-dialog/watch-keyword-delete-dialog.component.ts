import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WatchKeyword } from 'src/app/shared/models/news/watch-keyword.model';
import { Subscription } from 'rxjs';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-watch-keyword-delete-dialog',
  templateUrl: './watch-keyword-delete-dialog.component.html',
  styleUrls: ['./watch-keyword-delete-dialog.component.css']
})
export class WatchKeywordDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedWatchKeyword: WatchKeyword;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  watchKeywordDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private watchKeywordSrv: WatchKeywordService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.watchKeywordSrv.apiUrl = environment.news_management.watch_management.keyword;
    this.watchKeywordDeleteSubscription = this.watchKeywordSrv.delete(this.selectedWatchKeyword.pkKeywordID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Watch keyword successfully deleted.' });
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
    if (this.watchKeywordDeleteSubscription) { this.watchKeywordDeleteSubscription.unsubscribe(); }
  }


}
