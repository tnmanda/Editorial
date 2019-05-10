import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Collection } from '../../../../../shared/models/bwq/collection.model';
import { Subscription } from 'rxjs';
import { CollectionService } from '../../../../../shared/services/bwq/collection.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-collection-delete-dialog',
  templateUrl: './collection-delete-dialog.component.html',
  styleUrls: ['./collection-delete-dialog.component.css']
})
export class CollectionDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedCollection: Collection;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  collectionDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private collectionSrv: CollectionService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.collectionSrv.apiUrl = environment.bwq_management.collection.root;
    this.collectionDeleteSubscription = this.collectionSrv.delete(this.selectedCollection.collectionID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedCollection.collectionName + ' successfully deleted.' });
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
    if (this.collectionDeleteSubscription) { this.collectionDeleteSubscription.unsubscribe(); }
  }

}
