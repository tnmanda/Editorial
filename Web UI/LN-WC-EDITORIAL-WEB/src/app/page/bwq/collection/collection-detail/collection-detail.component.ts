import { Component, OnInit, OnDestroy } from '@angular/core';
import { Collection } from '../../../../shared/models/bwq/collection.model';
import { CollectionService } from '../../../../shared/services/bwq/collection.service';
import { CollectionItemService } from '../../../../shared/services/bwq/collection-item.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { CollectionItem } from '../../../../shared/models/bwq/collection-item.model';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css'],
  providers: [MessageService]
})
export class CollectionDetailComponent implements OnInit, OnDestroy {

  selectedCollection: Collection;
  selectedCollectionID: number;

  selectedCollectionItem: CollectionItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  collectionOneSubscription: Subscription;
  collectionItemAllSubscription: Subscription;
  collectionItemOneSubscription: Subscription;

  collectionItems: CollectionItem[];

  public items: MenuItem[];
  home: MenuItem;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private collectionSrv: CollectionService,
              private collectionItemSrv: CollectionItemService) { }

  ngOnInit() {
    this.getCollectionInfo();

    this.items = [
      {label: 'BWQ', url: 'bwq-entity-management'},
      {label: 'Collection', url: 'collection'},
      {label: 'Details', url: 'collection/collection-detail/' + this.selectedCollectionID},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};
  }

  getCollectionInfo() {
    if (this.route.snapshot.params['collectionID']) {
      this.selectedCollectionID = this.route.snapshot.params['collectionID'];
      this.collectionSrv.apiUrl = environment.bwq_management.collection.root;
      this.collectionOneSubscription = this.collectionSrv.getSingle(this.selectedCollectionID.toString()).subscribe((item: Collection) => {
        this.selectedCollection = item;
        this.getCollectionItems(this.selectedCollectionID);
      });

    }
  }

  getCollectionItems(collectionID) {
    this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.by_collection_id;
    this.collectionItemAllSubscription = this.collectionItemSrv.getByCollectionID(collectionID)
    .subscribe((items: Array<CollectionItem>) => {
        this.collectionItems = items;
    });
  }

  getCollectionItemByID(collectionItemID: number) {
    this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.root;
    this.collectionItemOneSubscription = this.collectionItemSrv.getSingle(collectionItemID.toString()).subscribe((item: CollectionItem) => {
        this.selectedCollectionItem = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getCollectionItems(this.selectedCollectionID);
  }

  showEditDialog(collectionItemID) {
    this.getCollectionItemByID(collectionItemID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getCollectionItems(this.selectedCollectionID);
  }

  showDeleteDialog(collectionItemID) {
    this.getCollectionItemByID(collectionItemID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getCollectionItems(this.selectedCollectionID);
  }

  onBack() {
    this.router.navigate(['/collection']);
  }

  ngOnDestroy(): void {
   if (this.collectionOneSubscription) { this.collectionOneSubscription.unsubscribe(); }
   if (this.collectionItemAllSubscription) { this.collectionItemAllSubscription.unsubscribe(); }
   if (this.collectionItemOneSubscription) { this.collectionItemOneSubscription.unsubscribe(); }
  }

}
