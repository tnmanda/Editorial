import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { WatchKeyword } from 'src/app/shared/models/news/watch-keyword.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { MessageService } from 'primeng/api';
import { Watch } from 'src/app/shared/models/news/watch.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-watch-keyword-add-dialog',
  templateUrl: './watch-keyword-add-dialog.component.html',
  styleUrls: ['./watch-keyword-add-dialog.component.css']
})
export class WatchKeywordAddDialogComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedWatch: Watch;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  watchKeyword: WatchKeyword;
  watchKeywordAddSubscription: Subscription;

  isSubmitted = false;

  watchKeywordForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.watchKeywordForm.controls; }

  constructor(private watchKeywordSrv: WatchKeywordService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.watchKeywordForm = new FormGroup ({
      'keyword' : new FormControl('', Validators.required),
      'engTran' : new FormControl('', Validators.required),
    });
  }

  onSave(watchKeywordForm) {
    this.isSubmitted = true;

    if (watchKeywordForm.valid) {
      this.watchKeyword = watchKeywordForm.value;
      this.watchKeyword.fkWatchID = this.selectedWatch.pkWatchID;
      this.watchKeyword.dateAdded = new Date().toUTCString();

      this.watchKeywordSrv.apiUrl = environment.news_management.watch_management.keyword;
      this.watchKeywordAddSubscription = this.watchKeywordSrv.post(this.watchKeyword).subscribe(result => {
        this.onClose();
        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Watch keyword successfully created.' });

        this.watchKeyword = new WatchKeyword();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.watchKeywordForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.watchKeywordAddSubscription) { this.watchKeywordAddSubscription.unsubscribe(); }
  }


}
