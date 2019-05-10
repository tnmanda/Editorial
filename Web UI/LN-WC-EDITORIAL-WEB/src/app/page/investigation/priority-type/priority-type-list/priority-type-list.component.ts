import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PriorityType } from 'src/app/shared/models/investigation/priority-type.model';
import { MenuItem, MessageService } from 'primeng/api';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-priority-type-list',
  templateUrl: './priority-type-list.component.html',
  styleUrls: ['./priority-type-list.component.css'],
  providers: [MessageService]
})
export class PriorityTypeListComponent implements OnInit, OnDestroy {

  selectedPriorityType: PriorityType;
  priorityTypeAllSubscription: Subscription;
  priorityTypeOneSubscription: Subscription;

  priorityTypes: PriorityType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private priorityTypeSrv: PriorityTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Investigation', url: 'investigation-entity-management'},
      {label: 'Priority Type', url: 'priority-type'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getPriorityTypes();
  }

  getPriorityTypes() {
    this.priorityTypeSrv.apiUrl = environment.investigation_management.priority_type.root;
    this.priorityTypeAllSubscription = this.priorityTypeSrv.getAll().subscribe((items: Array<PriorityType>) => {
        this.priorityTypes = items;
    });
  }

  getPriorityTypeByID(priorityTypeID: number) {

    this.priorityTypeSrv.apiUrl = environment.investigation_management.priority_type.root;
    this.priorityTypeOneSubscription = this.priorityTypeSrv.getSingle(priorityTypeID.toString()).subscribe((item: PriorityType) => {
      this.selectedPriorityType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getPriorityTypes();
  }

  showEditDialog(priorityTypeID) {
    this.getPriorityTypeByID(priorityTypeID);
    this.displayEditDialog = true;

  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getPriorityTypes();
  }

  showDeleteDialog(priorityTypeID) {
    this.getPriorityTypeByID(priorityTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getPriorityTypes();
  }

  ngOnDestroy(): void {
    if (this.priorityTypeAllSubscription) { this.priorityTypeAllSubscription.unsubscribe(); }
    if (this.priorityTypeOneSubscription) { this.priorityTypeOneSubscription.unsubscribe(); }
  }

}
