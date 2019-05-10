import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenderType } from '../../../../../shared/models/admin/types/gender-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { GenderTypeService } from '../../../../../shared/services/admin/types/gender-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-gender-type-list',
  templateUrl: './gender-type-list.component.html',
  styleUrls: ['./gender-type-list.component.css'],
  providers: [MessageService]
})
export class GenderTypeListComponent implements OnInit, OnDestroy {

  selectedGenderType: GenderType;
  genderTypeAllSubscription: Subscription;
  genderTypeOneSubscription: Subscription;

  genderTypes: GenderType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private genderTypeSrv: GenderTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Gender'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getGenderTypes();
  }

  getGenderTypes() {
    this.genderTypeSrv.apiUrl = environment.genderType.root;
    this.genderTypeAllSubscription = this.genderTypeSrv.getAll().subscribe((items: Array<GenderType>) => {
        this.genderTypes = items;
    });
  }

  getGenderTypeByID(genderTypeID: number) {
    this.genderTypeSrv.apiUrl = environment.genderType.root;
    this.genderTypeOneSubscription = this.genderTypeSrv.getSingle(genderTypeID.toString()).subscribe((item: GenderType) => {
      this.selectedGenderType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getGenderTypes();
  }

  showEditDialog(genderTypeID) {
    this.getGenderTypeByID(genderTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getGenderTypes();
  }

  showDeleteDialog(genderTypeID) {
    this.getGenderTypeByID(genderTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getGenderTypes();
  }

  ngOnDestroy(): void {
    if (this.genderTypeAllSubscription) { this.genderTypeAllSubscription.unsubscribe(); }
    if (this.genderTypeOneSubscription) { this.genderTypeOneSubscription.unsubscribe(); }
  }

}
