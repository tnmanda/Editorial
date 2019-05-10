import { Component, OnInit } from '@angular/core';
import { HumanReviewFormsControl } from '../../../../human-review-sdk/human-review-forms-control.class';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { HumanReviewFormsService } from '../../../../human-review-sdk/human-review-forms.service';
import { TokenService } from '../../shared/services/token.service';
import { wco_environment } from '../../shared/models/wco-environment';
import { Auth } from '../../shared/models/auth.model';
import { ActivatedRoute } from '@angular/router';
import { GlobalHelperService } from '../../shared/helpers/global-helper.service';
import { NewsService } from '../../shared/services/news.service';
import { Subscription } from 'rxjs';
import { NewsObject } from '../../shared/models/news-object.model';
import { NewsStatusService } from '../../shared/services/news-status.service';
import { NewsStatus } from '../../shared/models/news-status.model';
import { NewsQueueEntry } from '../../shared/models/news-queue-entry.model';
import { NewsPostData, LockData } from '../../shared/models/news-post-data.model';

@Component({
  selector: 'hr-news-queue',
  templateUrl: './news-queue.component.html',
  styleUrls: ['./news-queue.component.css']
})
export class NewsQueueComponent extends HumanReviewFormsControl implements OnInit {

  selectedWorkItemId: string;

  checked = false;
  disabled = false;

  newsObjectSubscription: Subscription;
  newsStatusSubscription: Subscription;
  newsSubscription: Subscription;

  newsObject: NewsObject;

  newsStatuses: NewsStatus[];
  newsQueueEntry: NewsQueueEntry;

  eventListener: any;
  event: any;

  constructor(private route: ActivatedRoute,
              public globalHelperSrv: GlobalHelperService,
              private newsSrv: NewsService,
              private newsStatusSrv: NewsStatusService,
              public humanReviewFormsSvc: HumanReviewFormsService,
              private tokenService: TokenService) {
              super(new FormGroup({
                'newsStatus' : new FormControl('', Validators.required),
              }), humanReviewFormsSvc);
  }

  ngOnInit() {
    this.eventListener = window.addEventListener('message', this.eventMessage.bind(this), false);
  }

  eventMessage(event) {
    if (event.origin === wco_environment.editorial_web) {
      this.event = event;
      if (event.data) {
        const auth = new Auth();
        const jsonToken = JSON.parse(event.data);
        auth.apitokendata = jsonToken.apitokendata;
        auth.hrtokendata = jsonToken.hrtokendata;
        auth.isAuthenticated = jsonToken.isAuthenticated;
        this.tokenService.setAuthModel(wco_environment.api_token, auth);

        this.getNewsStatus();
        this.getNewsObjectDetails();
      }
    }
  }

  getNewsStatus() {
    this.newsStatusSrv.apiUrl = wco_environment.news.status.root;
    this.newsStatusSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.newsStatusSubscription = this.newsStatusSrv.getAll().subscribe((items: Array<NewsStatus>) => {
        this.newsStatuses = items;
        console.log(this.newsStatuses);
    });
  }

  getNewsObjectDetails() {
    if (this.route.snapshot.params['id']) {
      this.selectedWorkItemId = this.route.snapshot.params['id'];
      this.newsSrv.apiUrl = wco_environment.news.object_by_workitemguid;
      this.newsSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.newsObjectSubscription = this.newsSrv.getNewsObject(this.selectedWorkItemId)
      .subscribe((item: NewsObject) => {
        this.newsObject = item;

        if (this.newsObject.lockedTo !== null) {
          if (this.newsObject.lockedTo.appUserID !== 0) {
            this.checked = true;
          } else {
            this.checked = false;
          }
          if (this.newsObject.lockedTo.appUserID.toString() === this.globalHelperSrv.getCurrentUserID()) {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        } else {
          this.checked = false;
        }

        console.log(this.newsObject);
      });
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (formDirective.valid) {

      this.newsQueueEntry = this.newsObject.feedItemQueue;
      this.newsQueueEntry.state =  <number>this.humanReviewForm.get('newsStatus').value;
      this.newsQueueEntry.stateChanged = new Date().toUTCString();
      this.newsQueueEntry.stateChangedRecipient = Number.parseInt(this.globalHelperSrv.getCurrentUserID());

      const newsPostData = new NewsPostData();
      newsPostData.feedItemQueue = this.newsQueueEntry;
      newsPostData.hrToken = this.globalHelperSrv.getHRToken();
      newsPostData.workItemGuid = this.selectedWorkItemId;

      console.log(newsPostData);

      this.newsSrv.apiUrl = wco_environment.news.submit_feeditemqueue;
      this.newsSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.newsSubscription = this.newsSrv.put(newsPostData).subscribe(result => {
        this.onCancel();
      });
    }
  }

  onCancel() {
    this.event.source.postMessage('trigger refresh', this.event.origin);
    this.humanReviewForm.reset();
    window.close();
  }

  onChangeLockRecord(event) {

    const lockData = new LockData();
    lockData.workUnitTypeID = 5;
    lockData.appUserID = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    lockData.idFromWorkUnitsDBTable = this.newsObject.feedItemQueue.id;

    if (event.checked) {
       // locked
      this.postLockUnlock(lockData, true);
    } else {
       // unlocked
       this.postLockUnlock(lockData, false);
    }
  }

  postLockUnlock(item: LockData, state: boolean) {
    if (state) {
      this.newsSrv.apiUrl = wco_environment.news.lock;
    } else {
      this.newsSrv.apiUrl = wco_environment.news.unlock;
    }

    this.newsSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.newsSubscription = this.newsSrv.lockUnlock(item).subscribe(result => {
      console.log(result);
      // this.onCancel();
    });
  }

}
