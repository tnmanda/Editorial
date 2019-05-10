import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { Collection } from '../../../../shared/models/bwq/collection.model';
import { CollectionService } from '../../../../shared/services/bwq/collection.service';
import { CollectionItemService } from '../../../../shared/services/bwq/collection-item.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
  providers: [MessageService]
})
export class CollectionListComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  collections: Collection[];
  selectedCollection: Collection;

  collectionAllSubscription: Subscription;
  collectionOneSubscription: Subscription;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private collectionSrv: CollectionService) { }

  ngOnInit() {
    this.items = [
      {label: 'BWQ', url: 'bwq-entity-management'},
      {label: 'Collection', url: 'collection'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getCollections();
  }

  getCollections() {
    this.collectionSrv.apiUrl = environment.bwq_management.collection.root;
    this.collectionAllSubscription = this.collectionSrv.getAll().subscribe((items: Array<Collection>) => {
      this.collections = items;
    });
  }

  getCollectionByID(collectionID: number) {
    this.collectionSrv.apiUrl = environment.bwq_management.collection.root;
    this.collectionOneSubscription = this.collectionSrv.getSingle(collectionID.toString()).subscribe((item: Collection) => {
        this.selectedCollection = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getCollections();
  }

  showEditDialog(collectionID) {
    this.getCollectionByID(collectionID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getCollections();
  }

  showDeleteDialog(collectionID) {
    this.getCollectionByID(collectionID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getCollections();
  }

  ngOnDestroy(): void {
    if (this.collectionAllSubscription) { this.collectionAllSubscription.unsubscribe(); }
    if (this.collectionOneSubscription) { this.collectionOneSubscription.unsubscribe(); }
  }

}
