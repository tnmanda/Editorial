import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactType } from '../../../../../shared/models/admin/types/contact-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { ContactTypeService } from '../../../../../shared/services/admin/types/contact-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-contact-type-list',
  templateUrl: './contact-type-list.component.html',
  styleUrls: ['./contact-type-list.component.css'],
  providers: [MessageService]
})
export class ContactTypeListComponent implements OnInit, OnDestroy {

  selectedContactType: ContactType;
  contactTypeAllSubscription: Subscription;
  contactTypeOneSubscription: Subscription;

  contactTypes: ContactType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private contactTypeSrv: ContactTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Contact'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getContactTypes();
  }

  getContactTypes() {
    this.contactTypeSrv.apiUrl = environment.contactType.root;
    this.contactTypeAllSubscription = this.contactTypeSrv.getAll().subscribe((items: Array<ContactType>) => {
        this.contactTypes = items;
    });
  }

  getContactTypeByID(contactTypeID) {
    this.contactTypeSrv.apiUrl = environment.contactType.root;
    this.contactTypeOneSubscription = this.contactTypeSrv.getSingle(contactTypeID).subscribe((item: ContactType) => {
      this.selectedContactType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getContactTypes();
  }

  showEditDialog(contactTypeID) {
    this.getContactTypeByID(contactTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getContactTypes();
  }

  showDeleteDialog(contactTypeID) {
    this.getContactTypeByID(contactTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getContactTypes();
  }


  ngOnDestroy(): void {
    if (this.contactTypeAllSubscription) { this.contactTypeAllSubscription.unsubscribe(); }
    if (this.contactTypeOneSubscription) { this.contactTypeOneSubscription.unsubscribe(); }
  }

}
