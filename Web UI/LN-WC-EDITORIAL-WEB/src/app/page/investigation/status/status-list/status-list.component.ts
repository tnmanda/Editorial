import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from 'src/app/shared/models/investigation/status.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
  providers: [MessageService]
})
export class StatusListComponent implements OnInit, OnDestroy {

  selectedStatus: Status;

  statusAllSubscription: Subscription;
  statusOneSubscription: Subscription;

  Statuses: Status[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private statusSrv: StatusService) { }

  ngOnInit() {
    this.items = [
      {label: 'Investigation', url: 'investigation-entity-management'},
      {label: 'Status', url: 'status'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getPriorityTypes();
  }

  getPriorityTypes() {
    this.statusSrv.apiUrl = environment.investigation_management.status.root;
    this.statusAllSubscription = this.statusSrv.getAll().subscribe((items: Array<Status>) => {
        this.Statuses = items;
    });
  }

  getPriorityTypeByID(statusID: number) {
    this.statusSrv.apiUrl = environment.investigation_management.status.root;
    this.statusOneSubscription = this.statusSrv.getSingle(statusID.toString()).subscribe((item: Status) => {
      this.selectedStatus = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getPriorityTypes();
  }

  showEditDialog(investigationStatusID) {
    this.getPriorityTypeByID(investigationStatusID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getPriorityTypes();
  }

  showDeleteDialog(investigationStatusID) {
    this.getPriorityTypeByID(investigationStatusID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getPriorityTypes();
  }

  ngOnDestroy(): void {
    if (this.statusAllSubscription) { this.statusAllSubscription.unsubscribe(); }
    if (this.statusOneSubscription) { this.statusOneSubscription.unsubscribe(); }
  }

}
