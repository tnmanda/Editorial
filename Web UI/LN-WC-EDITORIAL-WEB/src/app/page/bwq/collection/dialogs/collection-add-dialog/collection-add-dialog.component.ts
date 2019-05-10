import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { Collection } from '../../../../../shared/models/bwq/collection.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { CollectionService } from '../../../../../shared/services/bwq/collection.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-collection-add-dialog',
  templateUrl: './collection-add-dialog.component.html',
  styleUrls: ['./collection-add-dialog.component.css']
})
export class CollectionAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  collection: Collection;
  collectionAddSubscription: Subscription;

  isSubmitted = false;

  collectionForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.collectionForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private collectionSrv: CollectionService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.collectionForm = new FormGroup ({
      'collectionName' : new FormControl('', Validators.required),
      'collectionDescription' : new FormControl('', Validators.required),
      'sortOrder' : new FormControl('', Validators.required),
    });
  }

  onSave(collectionForm) {
    this.isSubmitted = true;

    if (collectionForm.valid) {
      this.collection = collectionForm.value;
      this.collection.collectionName = this.collection.collectionName;
      this.collection.collectionDescription = this.collection.collectionDescription;
      this.collection.sortOrder = this.collection.sortOrder;
      this.collection.createdBy = this.globalHelperSrv.getCurrentUser();
      this.collection.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.collection.dateCreatedUTC = new Date().toUTCString();
      this.collection.lastUpdatedUTC = new Date().toUTCString();

      this.collectionSrv.apiUrl = environment.bwq_management.collection.root;
      this.collectionAddSubscription = this.collectionSrv.post(this.collection).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: this.collection.collectionName + ' successfully created.' });

        this.collection = new Collection();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.isSubmitted = false;
    this.collectionForm.reset();
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.collectionAddSubscription) { this.collectionAddSubscription.unsubscribe(); }
  }

}
