import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkUnitType } from '../../../../../shared/models/admin/types/work-unit-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { WorkUnitTypeService } from '../../../../../shared/services/admin/types/work-unit-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-work-unit-type-list',
  templateUrl: './work-unit-type-list.component.html',
  styleUrls: ['./work-unit-type-list.component.css'],
  providers: [MessageService]
})
export class WorkUnitTypeListComponent implements OnInit, OnDestroy {

  selectedWorkUnitType: WorkUnitType;
  workUnitTypeAllSubscription: Subscription;
  workUnitTypeOneSubscription: Subscription;

  workUnitTypes: WorkUnitType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private workUnitTypeSrv: WorkUnitTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Work Unit', url: 'work-unit-type'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getWorkUnitTypes();
  }

  getWorkUnitTypes() {
    this.workUnitTypeSrv.apiUrl = environment.workUnitType.root;
    this.workUnitTypeAllSubscription = this.workUnitTypeSrv.getAll().subscribe((items: Array<WorkUnitType>) => {
        this.workUnitTypes = items;
    });
  }

  getWorkUnitTypeByID(workUnitTypeID: number) {
    this.workUnitTypeSrv.apiUrl = environment.workUnitType.root;
    this.workUnitTypeOneSubscription = this.workUnitTypeSrv.getSingle(workUnitTypeID.toString()).subscribe((item: WorkUnitType) => {
      this.selectedWorkUnitType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
    console.log('add');
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getWorkUnitTypes();
  }

  showEditDialog(workUnitTypeID) {
    this.getWorkUnitTypeByID(workUnitTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getWorkUnitTypes();
  }

  showDeleteDialog(workUnitTypeID) {
    this.getWorkUnitTypeByID(workUnitTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getWorkUnitTypes();
  }

  ngOnDestroy(): void {
   if (this.workUnitTypeAllSubscription) { this.workUnitTypeAllSubscription.unsubscribe(); }
   if (this.workUnitTypeOneSubscription) { this.workUnitTypeOneSubscription.unsubscribe(); }
  }

}
