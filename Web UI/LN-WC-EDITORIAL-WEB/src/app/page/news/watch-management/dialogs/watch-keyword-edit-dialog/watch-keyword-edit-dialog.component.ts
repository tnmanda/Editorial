import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { WatchKeyword } from 'src/app/shared/models/news/watch-keyword.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-watch-keyword-edit-dialog',
  templateUrl: './watch-keyword-edit-dialog.component.html',
  styleUrls: ['./watch-keyword-edit-dialog.component.css']
})
export class WatchKeywordEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedWatchKeyword: WatchKeyword;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  watchKeywordEditSubscription: Subscription;

  watchKeywordForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.watchKeywordForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private watchKeywordSrv: WatchKeywordService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedWatchKeyword) {
      this.generateForm();
      this.watchKeywordForm.setValue({
          keyword: this.selectedWatchKeyword.keyword,
          engTran: this.selectedWatchKeyword.engTran,
      });
    }
  }

  generateForm() {
    this.watchKeywordForm = new FormGroup ({
      'keyword' : new FormControl('', Validators.required),
      'engTran' : new FormControl('', Validators.required),
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      let watchKeyword = new WatchKeyword();
      watchKeyword = this.selectedWatchKeyword;
      watchKeyword.keyword = <string>this.watchKeywordForm.get('keyword').value;
      watchKeyword.engTran = <string>this.watchKeywordForm.get('engTran').value;

      this.watchKeywordSrv.apiUrl = environment.news_management.watch_management.keyword;
      this.watchKeywordEditSubscription = this.watchKeywordSrv.put(watchKeyword).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Watch keyword successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.watchKeywordForm.reset();
    this.displayChange.emit(false);
    this.selectedWatchKeyword = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.watchKeywordEditSubscription) { this.watchKeywordEditSubscription.unsubscribe(); }
  }


}
