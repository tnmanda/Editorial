import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CollectionItem } from '../../../../../shared/models/bwq/collection-item.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { CollectionItemService } from '../../../../../shared/services/bwq/collection-item.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-collection-item-edit-dialog',
  templateUrl: './collection-item-edit-dialog.component.html',
  styleUrls: ['./collection-item-edit-dialog.component.css']
})
export class CollectionItemEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedCollectionItem: CollectionItem;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  collectionItemEditSubscription: Subscription;

  collectionItemForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.collectionItemForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private collectionItemSrv: CollectionItemService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedCollectionItem) {
      this.generateForm();
      this.collectionItemForm.setValue({
        itemText: this.selectedCollectionItem.itemText,
        itemValue: this.selectedCollectionItem.itemValue,
        itemDescription: this.selectedCollectionItem.itemDescription,
      });
    }
  }

  generateForm() {
    this.collectionItemForm = new FormGroup ({
      'itemText' : new FormControl('', Validators.required),
      'itemValue' : new FormControl('', Validators.required),
      'itemDescription' : new FormControl('', Validators.required),
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const collectionItem = new CollectionItem();
      collectionItem.collectionItemID = this.selectedCollectionItem.collectionItemID;
      collectionItem.collectionID = this.selectedCollectionItem.collectionID;
      collectionItem.itemText = <string>this.collectionItemForm.get('itemText').value;
      collectionItem.itemValue = <string>this.collectionItemForm.get('itemValue').value;
      collectionItem.itemDescription = <string>this.collectionItemForm.get('itemDescription').value;
      collectionItem.createdBy = this.selectedCollectionItem.createdBy;
      collectionItem.dateCreatedUTC = this.selectedCollectionItem.dateCreatedUTC;
      collectionItem.updatedBy = this.globalHelperSrv.getCurrentUser();
      collectionItem.lastUpdatedUTC = new Date().toUTCString();

      this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.root;
      this.collectionItemEditSubscription = this.collectionItemSrv.put(collectionItem).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedCollectionItem.itemText + ' successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.collectionItemForm.reset();
    this.displayChange.emit(false);
    this.selectedCollectionItem = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.collectionItemEditSubscription) { this.collectionItemEditSubscription.unsubscribe(); }
  }

}
