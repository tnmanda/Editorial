import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { CollectionItemService } from '../../../../../shared/services/bwq/collection-item.service';
import { MessageService } from 'primeng/api';
import { CollectionItem } from '../../../../../shared/models/bwq/collection-item.model';
import { environment } from '../../../../../../environments/environment';
import { Collection } from '../../../../../shared/models/bwq/collection.model';

@Component({
  selector: 'app-collection-item-add-dialog',
  templateUrl: './collection-item-add-dialog.component.html',
  styleUrls: ['./collection-item-add-dialog.component.css']
})
export class CollectionItemAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedCollection: Collection;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  collectionItem: CollectionItem;
  collectionItemAddSubscription: Subscription;

  isSubmitted = false;

  collectionItemForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.collectionItemForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private collectionItemSrv: CollectionItemService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.collectionItemForm = new FormGroup ({
      'itemText' : new FormControl('', Validators.required),
      'itemValue' : new FormControl('', Validators.required),
      'itemDescription' : new FormControl('', Validators.required),
    });
  }

  onSave(collectionItemForm) {
    this.isSubmitted = true;

    if (collectionItemForm.valid) {
      this.collectionItem = collectionItemForm.value;
      this.collectionItem.collectionID = this.selectedCollection.collectionID;
      this.collectionItem.itemText = this.collectionItem.itemText;
      this.collectionItem.itemValue = this.collectionItem.itemValue;
      this.collectionItem.itemDescription = this.collectionItem.itemDescription;
      this.collectionItem.createdBy = this.globalHelperSrv.getCurrentUser();
      this.collectionItem.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.collectionItem.dateCreatedUTC = new Date().toUTCString();
      this.collectionItem.lastUpdatedUTC = new Date().toUTCString();

      this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.root;
      this.collectionItemAddSubscription = this.collectionItemSrv.post(this.collectionItem).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: this.collectionItem.itemText + ' successfully created.' });

        this.collectionItem = new CollectionItem();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.isSubmitted = false;
    this.collectionItemForm.reset();
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.collectionItemAddSubscription) { this.collectionItemAddSubscription.unsubscribe(); }
  }

}
