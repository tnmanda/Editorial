import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbsenceType } from '../../../../../shared/models/admin/types/absence-type.model';
import { MenuItem, MessageService } from 'primeng/api';
import { AbsenceTypeService } from '../../../../../shared/services/admin/types/absence-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-absence-type-list',
  templateUrl: './absence-type-list.component.html',
  styleUrls: ['./absence-type-list.component.css'],
  providers: [MessageService]
})
export class AbsenceTypeListComponent implements OnInit, OnDestroy {

  selectedAbsenceType: AbsenceType;

  absenceTypeAllSubscription: Subscription;
  absenceTypeOneSubscription: Subscription;

  absenceTypes: AbsenceType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private absenceTypeSrv: AbsenceTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Absence Type'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getAbsenceTypes();
  }

  getAbsenceTypes() {
    this.absenceTypeSrv.apiUrl = environment.absenceType.root;
    this.absenceTypeAllSubscription = this.absenceTypeSrv.getAll().subscribe((items: Array<AbsenceType>) => {
        console.log(items);
        this.absenceTypes = items;
    });
  }

  getAbsenceTypeByID(absenceTypeID: number) {
    this.absenceTypeSrv.apiUrl = environment.absenceType.root;
    this.absenceTypeOneSubscription =  this.absenceTypeSrv.getSingle(absenceTypeID.toString()).subscribe((item: AbsenceType) => {
      this.selectedAbsenceType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getAbsenceTypes();
  }

  showEditDialog(absenceTypeID) {
    this.getAbsenceTypeByID(absenceTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getAbsenceTypes();
  }

  showDeleteDialog(absenceTypeID) {
    this.getAbsenceTypeByID(absenceTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getAbsenceTypes();
  }

  ngOnDestroy(): void {
   if (this.absenceTypeAllSubscription) { this.absenceTypeAllSubscription.unsubscribe(); }
   if (this.absenceTypeOneSubscription) { this.absenceTypeOneSubscription.unsubscribe(); }
  }


}
