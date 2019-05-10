import { Component, OnInit, OnDestroy } from '@angular/core';
import { Watch } from 'src/app/shared/models/news/watch.model';
import { Subscription } from 'rxjs';
import { WatchService } from 'src/app/shared/services/news/watch.service';
import { MenuItem, MessageService } from 'primeng/api';
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { WatchKeyword } from 'src/app/shared/models/news/watch-keyword.model';

@Component({
  selector: 'app-watch-keyword-list',
  templateUrl: './watch-keyword-list.component.html',
  styleUrls: ['./watch-keyword-list.component.css'],
  providers: [MessageService]
})
export class WatchKeywordListComponent implements OnInit, OnDestroy {

  selectedWatch: Watch;
  selectedWatchID: any;

  selectedWatchKeyword: WatchKeyword;

  watchSelectedSubscription: Subscription;
  watchKeywordAllSubscription: Subscription;
  watchKeywordOneSubscription: Subscription;

  watches: Watch[];
  watchKeywords: WatchKeyword[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private route: ActivatedRoute,
              private watchSrv: WatchService,
              private watchKeywordSrv: WatchKeywordService) { }

  ngOnInit() {
    this.getSelectedWatch();
    this.getWatchKeywords();

    this.items = [
      {label: 'News', url: 'news-management'},
      {label: 'Watch Management', url: 'watch-management'},
      {label: 'Keywords', url: 'watch-management/keyword-list/' + this.selectedWatchID},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};
  }

  getSelectedWatch() {
    console.log(this.route.snapshot.params['watchID']);
    if (this.route.snapshot.params['watchID']) {
        this.selectedWatchID = this.route.snapshot.params['watchID'];
        if (this.selectedWatchID !== null || this.selectedWatchID !== undefined) {
          this.watchSrv.apiUrl = environment.news_management.watch_management.root;
          this.watchSelectedSubscription = this.watchSrv.getSingle(this.selectedWatchID).subscribe((item: Watch) => {
            this.selectedWatch = item;
          });
        }
    }
  }

  getWatchKeywords() {
    this.watchKeywordSrv.apiUrl = environment.news_management.watch_management.keyword_by_watchId;
    this.watchKeywordAllSubscription = this.watchKeywordSrv.getByWatchId(this.selectedWatchID)
    .subscribe((items: Array<WatchKeyword>) => {
      this.watchKeywords = items;
    });
  }

  getSelectedWatchKeyword(pkKeywordID: number) {
    this.watchKeywordSrv.apiUrl = environment.news_management.watch_management.keyword;
    this.watchKeywordOneSubscription = this.watchKeywordSrv.getSingle(pkKeywordID.toString()).subscribe((item: WatchKeyword) => {
        this.selectedWatchKeyword = item;
    });
  }


  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getWatchKeywords();
  }

  showEditDialog(pkKeywordID) {
    this.getSelectedWatchKeyword(pkKeywordID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getWatchKeywords();
  }

  showDeleteDialog(pkKeywordID) {
    this.getSelectedWatchKeyword(pkKeywordID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getWatchKeywords();
  }

  ngOnDestroy(): void {
    if (this.watchSelectedSubscription) { this.watchSelectedSubscription.unsubscribe(); }
    if (this.watchKeywordAllSubscription) { this.watchKeywordAllSubscription.unsubscribe(); }
    if (this.watchKeywordOneSubscription) { this.watchKeywordOneSubscription.unsubscribe(); }
  }

}
