import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProficiencyType } from '../../../../../shared/models/admin/types/proficiency-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { ProficiencyTypeService } from '../../../../../shared/services/admin/types/proficiency-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-proficiency-type-list',
  templateUrl: './proficiency-type-list.component.html',
  styleUrls: ['./proficiency-type-list.component.css'],
  providers: [MessageService]
})
export class ProficiencyTypeListComponent implements OnInit, OnDestroy  {

  selectedProficiencyType: ProficiencyType;
  proficiencyTypeAllSubscription: Subscription;
  proficiencyTypeOneSubscription: Subscription;

  proficiencyTypes: ProficiencyType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private proficiencyTypeSrv: ProficiencyTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Proficiency'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getProficiencyTypes();
  }

  getProficiencyTypes() {
    this.proficiencyTypeSrv.apiUrl = environment.proficiencyType.root;
    this.proficiencyTypeAllSubscription = this.proficiencyTypeSrv.getAll().subscribe((items: Array<ProficiencyType>) => {
        this.proficiencyTypes = items;
    });
  }

  getProficiencyTypeByID(proficiencyTypeID: number) {
    this.proficiencyTypeSrv.apiUrl = environment.proficiencyType.root;
    this.proficiencyTypeOneSubscription = this.proficiencyTypeSrv.getSingle(proficiencyTypeID.toString())
    .subscribe((item: ProficiencyType) => {
      this.selectedProficiencyType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
    console.log('add');
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getProficiencyTypes();
  }

  showEditDialog(proficiencyTypeID) {
    this.getProficiencyTypeByID(proficiencyTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getProficiencyTypes();
  }

  showDeleteDialog(proficiencyTypeID) {
    this.getProficiencyTypeByID(proficiencyTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getProficiencyTypes();
  }

  ngOnDestroy(): void {
    if (this.proficiencyTypeAllSubscription) { this.proficiencyTypeAllSubscription.unsubscribe(); }
    if (this.proficiencyTypeOneSubscription) { this.proficiencyTypeOneSubscription.unsubscribe(); }
  }

}
