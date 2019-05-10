import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageType } from '../../../../../shared/models/admin/types/language-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { LanguageTypeService } from '../../../../../shared/services/admin/types/language-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-language-type-list',
  templateUrl: './language-type-list.component.html',
  styleUrls: ['./language-type-list.component.css'],
  providers: [MessageService]
})
export class LanguageTypeListComponent implements OnInit, OnDestroy {

  selectedLanguageType: LanguageType;
  languageTypeAllSubscription: Subscription;
  languageTypeOneSubscription: Subscription;

  languageTypes: LanguageType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private languageTypeSrv: LanguageTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Languages'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getLanguageTypes();
  }

  getLanguageTypes() {
    this.languageTypeSrv.apiUrl = environment.languageType.root;
    this.languageTypeAllSubscription = this.languageTypeSrv.getAll().subscribe((items: Array<LanguageType>) => {
        this.languageTypes = items;
    });
  }

  getLanguageTypeByID(languageTypeID: number) {
    this.languageTypeSrv.apiUrl = environment.languageType.root;
    this.languageTypeOneSubscription = this.languageTypeSrv.getSingle(languageTypeID.toString()).subscribe((item: LanguageType) => {
      this.selectedLanguageType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getLanguageTypes();
  }

  showEditDialog(languageTypeID) {
    this.getLanguageTypeByID(languageTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getLanguageTypes();
  }

  showDeleteDialog(languageTypeID) {
    this.getLanguageTypeByID(languageTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getLanguageTypes();
  }

  ngOnDestroy(): void {
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
    if (this.languageTypeOneSubscription) { this.languageTypeOneSubscription.unsubscribe(); }
  }

}
