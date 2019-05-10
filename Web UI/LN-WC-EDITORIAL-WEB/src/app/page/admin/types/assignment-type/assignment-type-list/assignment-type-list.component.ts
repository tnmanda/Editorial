import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { AssignmentType } from '../../../../../shared/models/admin/types/assignment-type.model';
import { Subscription } from 'rxjs';
import { AssignmentTypeService } from '../../../../../shared/services/admin/types/assignment-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-assignment-type-list',
  templateUrl: './assignment-type-list.component.html',
  styleUrls: ['./assignment-type-list.component.css'],
  providers: [MessageService]
})
export class AssignmentTypeListComponent implements OnInit, OnDestroy {

  selectedAssignmentType: AssignmentType;
  assignmentTypeAllSubscription: Subscription;
  assignmentTypeOneSubscription: Subscription;

  assignmentTypes: AssignmentType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private assignmentTypeSrv: AssignmentTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Assignment Type'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getAssignmentTypes();
  }

  getAssignmentTypes() {
    this.assignmentTypeSrv.apiUrl = environment.assignmentType.root;
    this.assignmentTypeAllSubscription = this.assignmentTypeSrv.getAll().subscribe((items: Array<AssignmentType>) => {
        this.assignmentTypes = items;
    });
  }

  getAssignmentTypeByID(assignmentTypeID: number) {
    this.assignmentTypeSrv.apiUrl = environment.assignmentType.root;
    this.assignmentTypeOneSubscription = this.assignmentTypeSrv.getSingle(assignmentTypeID.toString()).subscribe((item: AssignmentType) => {
      this.selectedAssignmentType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getAssignmentTypes();
  }

  showEditDialog(assignmentTypeID) {
    this.getAssignmentTypeByID(assignmentTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getAssignmentTypes();
  }

  showDeleteDialog(assignmentTypeID) {
    this.getAssignmentTypeByID(assignmentTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getAssignmentTypes();
  }


  ngOnDestroy(): void {
    if (this.assignmentTypeAllSubscription) { this.assignmentTypeAllSubscription.unsubscribe(); }
    if (this.assignmentTypeOneSubscription) { this.assignmentTypeOneSubscription.unsubscribe(); }
  }

}
