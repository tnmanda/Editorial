import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Watch } from 'src/app/shared/models/news/watch.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WatchService } from 'src/app/shared/services/news/watch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
  providers: [MessageService]
})
export class WatchListComponent implements OnInit, OnDestroy {

  selectedWatch: Watch;
  watchAllSubscription: Subscription;
  watchOneSubscription: Subscription;

  watches: Watch[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private watchSrv: WatchService) { }

  ngOnInit() {
    this.items = [
      {label: 'News', url: 'news-management'},
      {label: 'Watch Management', url: 'watch-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getWatches();
  }

  getWatches() {
    this.watchSrv.apiUrl = environment.news_management.watch_management.root;
    this.watchAllSubscription = this.watchSrv.getAll().subscribe((items: Array<Watch>) => {
        this.watches = items;
    });
  }

  getWatchByID(watchId: number) {
    this.watchSrv.apiUrl = environment.news_management.watch_management.root;
    this.watchOneSubscription = this.watchSrv.getSingle(watchId.toString()).subscribe(async (item: Watch) => {
        this.selectedWatch = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getWatches();
  }

  showEditDialog(pkWatchID) {
    this.getWatchByID(pkWatchID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getWatches();
  }

  showDeleteDialog(pkWatchID) {
    this.getWatchByID(pkWatchID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getWatches();
  }

  ngOnDestroy(): void {
    if (this.watchAllSubscription) { this.watchAllSubscription.unsubscribe(); }
    if (this.watchOneSubscription) { this.watchOneSubscription.unsubscribe(); }
  }

}
