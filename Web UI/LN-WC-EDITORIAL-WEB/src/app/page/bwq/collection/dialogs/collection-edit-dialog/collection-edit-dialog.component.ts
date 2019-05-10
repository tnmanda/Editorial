import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Collection } from '../../../../../shared/models/bwq/collection.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { CollectionService } from '../../../../../shared/services/bwq/collection.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-collection-edit-dialog',
  templateUrl: './collection-edit-dialog.component.html',
  styleUrls: ['./collection-edit-dialog.component.css']
})
export class CollectionEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedCollection: Collection;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  collectionEditSubscription: Subscription;

  collectionForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.collectionForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private collectionSrv: CollectionService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedCollection) {
      this.generateForm();
      this.collectionForm.setValue({
        collectionName: this.selectedCollection.collectionName,
        collectionDescription: this.selectedCollection.collectionDescription,
        sortOrder: this.selectedCollection.sortOrder,
      });
    }
  }

  generateForm() {
    this.collectionForm = new FormGroup ({
      'collectionName' : new FormControl('', Validators.required),
      'collectionDescription' : new FormControl('', Validators.required),
      'sortOrder' : new FormControl('', Validators.required),
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const collection = new Collection();
      collection.collectionID = this.selectedCollection.collectionID;
      collection.collectionName = <string>this.collectionForm.get('collectionName').value;
      collection.collectionDescription = <string>this.collectionForm.get('collectionDescription').value;
      collection.sortOrder = <number>this.collectionForm.get('sortOrder').value;
      collection.createdBy = this.selectedCollection.createdBy;
      collection.dateCreatedUTC = this.selectedCollection.dateCreatedUTC;
      collection.updatedBy = this.globalHelperSrv.getCurrentUser();
      collection.lastUpdatedUTC = new Date().toUTCString();
      console.log(collection);
      this.collectionSrv.apiUrl = environment.bwq_management.collection.root;
      this.collectionEditSubscription = this.collectionSrv.put(collection).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedCollection.collectionName + ' successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.collectionForm.reset();
    this.displayChange.emit(false);
    this.selectedCollection = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.collectionEditSubscription) { this.collectionEditSubscription.unsubscribe(); }
  }

}
