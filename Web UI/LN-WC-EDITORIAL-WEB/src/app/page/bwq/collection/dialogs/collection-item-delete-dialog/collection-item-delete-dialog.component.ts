import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CollectionItem } from '../../../../../shared/models/bwq/collection-item.model';
import { Subscription } from 'rxjs';
import { CollectionItemService } from '../../../../../shared/services/bwq/collection-item.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-collection-item-delete-dialog',
  templateUrl: './collection-item-delete-dialog.component.html',
  styleUrls: ['./collection-item-delete-dialog.component.css']
})
export class CollectionItemDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedCollectionItem: CollectionItem;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  collectionItemDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private collectionItemSrv: CollectionItemService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.root;
    this.collectionItemDeleteSubscription = this.collectionItemSrv.delete(this.selectedCollectionItem.collectionItemID)
    .subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedCollectionItem.itemText + ' successfully deleted.' });
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
    if (this.collectionItemDeleteSubscription) { this.collectionItemDeleteSubscription.unsubscribe(); }
  }

}
