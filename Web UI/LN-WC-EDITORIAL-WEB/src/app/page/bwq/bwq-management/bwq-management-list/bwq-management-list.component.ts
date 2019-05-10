import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Bwq } from '../../../../shared/models/bwq/bwq.model';
import { BwqService } from '../../../../shared/services/bwq/bwq.service';
import { environment } from '../../../../../environments/environment.prod';
import { CollectionService } from '../../../../shared/services/bwq/collection.service';
import { CollectionItemService } from '../../../../shared/services/bwq/collection-item.service';
import { CollectionItem } from '../../../../shared/models/bwq/collection-item.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bwq-management-list',
  templateUrl: './bwq-management-list.component.html',
  styleUrls: ['./bwq-management-list.component.css'],
  providers: [MessageService]
})
export class BwqManagementListComponent implements OnInit, OnDestroy {

  bwqAllSubscription: Subscription;
  connectionItemPrioritySubscription: Subscription;
  connectionItemStatusSubscription: Subscription;

  public items: MenuItem[];
  home: MenuItem;

  bwqs: Bwq[];
  selectedBwq: Bwq;

  priorities: CollectionItem[];
  status: CollectionItem[];

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private bwqSrv: BwqService,
              private collectionItemSrv: CollectionItemService) { }

  ngOnInit() {
    this.items = [
      {label: 'BWQ', url: 'bwq-entity-management'},
      {label: 'BWQ Management', url: 'bwq-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};


    this.getBwqs();
    this.getBwqPriorities();
    this.getBwqStatus();
  }

  getBwqPriorities() {
    this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.by_collection_id;
    this.connectionItemPrioritySubscription = this.collectionItemSrv.getByCollectionID('4').subscribe((items: Array<CollectionItem>) => {
      this.priorities = items;
    });
  }

  getBwqStatus() {
    this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.by_collection_id;
    this.connectionItemStatusSubscription = this.collectionItemSrv.getByCollectionID('3').subscribe((items: Array<CollectionItem>) => {
      this.status = items;
    });
  }

  getBwqs() {
    this.bwqSrv.apiUrl = environment.bwq_management.bwq.root;
    this.bwqAllSubscription = this.bwqSrv.getAll().subscribe((items: Array<Bwq>) => {
      this.bwqs = (items || []).sort((a: Bwq, b: Bwq) => a.dateCreatedUTC > b.dateCreatedUTC ? -1 : 1);
    });
  }

  onPriorityChange(event, dt) {
    const filterValues = Array<String>();
    event.value.forEach(item => {
      filterValues.push(item.itemText);
    });
    dt.filter(filterValues, 'priority', 'in');
  }

  onStatusChange(event, dt) {
    const filterValues = Array<String>();
    event.value.forEach(item => {
      filterValues.push(item.itemText);
    });
    dt.filter(filterValues, 'status', 'in');
  }

  ngOnDestroy(): void {
    if (this.bwqAllSubscription) { this.bwqAllSubscription.unsubscribe(); }
    if (this.connectionItemPrioritySubscription) { this.connectionItemPrioritySubscription.unsubscribe(); }
    if (this.connectionItemStatusSubscription) { this.connectionItemStatusSubscription.unsubscribe(); }
  }
}
