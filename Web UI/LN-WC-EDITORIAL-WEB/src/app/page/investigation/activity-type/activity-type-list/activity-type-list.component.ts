import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivityType } from 'src/app/shared/models/investigation/activity-type.model';
import { Subscription } from 'rxjs';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-type-list',
  templateUrl: './activity-type-list.component.html',
  styleUrls: ['./activity-type-list.component.css'],
  providers: [MessageService]
})
export class ActivityTypeListComponent implements OnInit, OnDestroy {

  selectedActivityType: ActivityType;
  activityTypeAllSubscription: Subscription;
  activityTypeOneSubscription: Subscription;

  activityTypes: ActivityType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private activityTypeSrv: ActivityTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Investigation', url: 'investigation-entity-management'},
      {label: 'Activity Type', url: 'activity-type'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getActivityTypes();
  }

  getActivityTypes() {
    this.activityTypeSrv.apiUrl = environment.investigation_management.activity_type.root;
    this.activityTypeAllSubscription = this.activityTypeSrv.getAll().subscribe((items: Array<ActivityType>) => {
        this.activityTypes = items;
    });
  }

  getActivityTypeByID(activityTypeID: number) {
    this.activityTypeSrv.apiUrl = environment.investigation_management.activity_type.root;
    this.activityTypeOneSubscription = this.activityTypeSrv.getSingle(activityTypeID.toString()).subscribe((item: ActivityType) => {
      this.selectedActivityType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getActivityTypes();
  }

  showEditDialog(activityTypeID) {
    this.getActivityTypeByID(activityTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getActivityTypes();
  }

  showDeleteDialog(activityTypeID) {
    this.getActivityTypeByID(activityTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getActivityTypes();
  }

  ngOnDestroy(): void {
    if (this.activityTypeAllSubscription) { this.activityTypeAllSubscription.unsubscribe(); }
    if (this.activityTypeOneSubscription) { this.activityTypeOneSubscription.unsubscribe(); }
  }

}
