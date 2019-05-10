import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartureType } from '../../../../../shared/models/admin/types/departure-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { DepartureTypeService } from '../../../../../shared/services/admin/types/departure-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-departure-type-list',
  templateUrl: './departure-type-list.component.html',
  styleUrls: ['./departure-type-list.component.css'],
  providers: [MessageService]
})
export class DepartureTypeListComponent implements OnInit, OnDestroy {

  selectedDepartureType: DepartureType;
  departureTypeAllSubscription: Subscription;
  departureTypeOneSubscription: Subscription;

  departureTypes: DepartureType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private departureTypeSrv: DepartureTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Departure'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getDepartureTypes();
  }

  getDepartureTypes() {
    this.departureTypeSrv.apiUrl = environment.departureType.root;
    this.departureTypeAllSubscription = this.departureTypeSrv.getAll().subscribe((items: Array<DepartureType>) => {
        this.departureTypes = items;
    });
  }

  getDepartureTypeByID(departureTypeID: number) {
    this.departureTypeSrv.apiUrl = environment.departureType.root;
    this.departureTypeOneSubscription = this.departureTypeSrv.getSingle(departureTypeID.toString()).subscribe((item: DepartureType) => {
      this.selectedDepartureType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getDepartureTypes();
  }

  showEditDialog(departureTypeID) {
    this.getDepartureTypeByID(departureTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getDepartureTypes();
  }

  showDeleteDialog(departureTypeID) {
    this.getDepartureTypeByID(departureTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getDepartureTypes();
  }

  ngOnDestroy(): void {
    if (this.departureTypeAllSubscription) { this.departureTypeAllSubscription.unsubscribe(); }
    if (this.departureTypeOneSubscription) { this.departureTypeOneSubscription.unsubscribe(); }
  }

}
