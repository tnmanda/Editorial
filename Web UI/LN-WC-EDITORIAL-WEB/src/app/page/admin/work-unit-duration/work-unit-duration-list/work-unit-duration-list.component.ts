import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkUnitDuration } from 'src/app/shared/models/admin/work-unit-duration.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { MenuItem, MessageService } from 'primeng/api';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-unit-duration-list',
  templateUrl: './work-unit-duration-list.component.html',
  styleUrls: ['./work-unit-duration-list.component.css'],
  providers: [MessageService]
})
export class WorkUnitDurationListComponent implements OnInit, OnDestroy {

  selectedWorkUnitDuration: WorkUnitDuration;

  workUnitDurations: WorkUnitDuration[];
  public items: MenuItem[];
  home: MenuItem;

  workUnitDurationAllSubscription: Subscription;
  workUnitDurationOneSubscription: Subscription;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private workUnitDurationSrv: WorkUnitDurationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Work Unit Duration', url: 'work-unit-duration'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getWorkUnitDurations();
  }

  getWorkUnitDurations() {
    this.workUnitDurationSrv.apiUrl = environment.workUnitDuration.root;
    this.workUnitDurationAllSubscription = this.workUnitDurationSrv.getAll().subscribe((items: Array<WorkUnitDuration>) => {
      this.workUnitDurations = items;
    });
  }

  getWorkUnitDurationByID(workLockDurationInMinID: number) {
    this.workUnitDurationSrv.apiUrl = environment.workUnitDuration.root;
    this.workUnitDurationOneSubscription = this.workUnitDurationSrv.getSingle(workLockDurationInMinID.toString())
    .subscribe((item: WorkUnitDuration) => {
        this.selectedWorkUnitDuration = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getWorkUnitDurations();
  }

  showEditDialog(workLockDurationInMinID) {
    this.getWorkUnitDurationByID(workLockDurationInMinID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getWorkUnitDurations();
  }

  showDeleteDialog(workLockDurationInMinID) {
    this.getWorkUnitDurationByID(workLockDurationInMinID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getWorkUnitDurations();
  }

  ngOnDestroy(): void {
    if (this.workUnitDurationAllSubscription) { this.workUnitDurationAllSubscription.unsubscribe(); }
    if (this.workUnitDurationOneSubscription) { this.workUnitDurationOneSubscription.unsubscribe(); }
  }


}
