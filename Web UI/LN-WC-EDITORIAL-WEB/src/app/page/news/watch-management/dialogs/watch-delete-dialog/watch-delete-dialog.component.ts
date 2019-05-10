import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Watch } from 'src/app/shared/models/news/watch.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { WatchService } from 'src/app/shared/services/news/watch.service';

@Component({
  selector: 'app-watch-delete-dialog',
  templateUrl: './watch-delete-dialog.component.html',
  styleUrls: ['./watch-delete-dialog.component.css']
})
export class WatchDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedWatch: Watch;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  watchDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private watchSrv: WatchService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.watchSrv.apiUrl = environment.news_management.watch_management.root;
    this.watchDeleteSubscription = this.watchSrv.delete(this.selectedWatch.pkWatchID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Watch successfully deleted.' });
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
    if (this.watchDeleteSubscription) { this.watchDeleteSubscription.unsubscribe(); }
  }


}
