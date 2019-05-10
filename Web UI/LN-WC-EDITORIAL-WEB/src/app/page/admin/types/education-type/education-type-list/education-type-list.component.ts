import { Component, OnInit, OnDestroy } from '@angular/core';
import { EducationType } from '../../../../../shared/models/admin/types/education-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { EducationTypeService } from '../../../../../shared/services/admin/types/education-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-education-type-list',
  templateUrl: './education-type-list.component.html',
  styleUrls: ['./education-type-list.component.css'],
  providers: [MessageService]
})
export class EducationTypeListComponent implements OnInit, OnDestroy {

  selectedEducationType: EducationType;
  educationTypeAllSubscription: Subscription;
  educationTypeOneSubscription: Subscription;

  educationTypes: EducationType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private educationTypeSrv: EducationTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Education'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getEducationTypes();
  }

  getEducationTypes() {
    this.educationTypeSrv.apiUrl = environment.educationType.root;
    this.educationTypeAllSubscription = this.educationTypeSrv.getAll().subscribe((items: Array<EducationType>) => {
        this.educationTypes = items;
    });
  }

  getEducationTypeByID(educationTypeID: number) {
    this.educationTypeSrv.apiUrl = environment.educationType.root;
    this.educationTypeOneSubscription = this.educationTypeSrv.getSingle(educationTypeID.toString()).subscribe((item: EducationType) => {
      this.selectedEducationType = item;
    });
   }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getEducationTypes();
  }

  showEditDialog(educationTypeID) {
    this.getEducationTypeByID(educationTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getEducationTypes();
  }

  showDeleteDialog(educationTypeID) {
    this.getEducationTypeByID(educationTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getEducationTypes();
  }

  ngOnDestroy(): void {
    if (this.educationTypeAllSubscription) { this.educationTypeAllSubscription.unsubscribe(); }
    if (this.educationTypeOneSubscription) { this.educationTypeOneSubscription.unsubscribe(); }
  }

}
