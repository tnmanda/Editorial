import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from '../../../../shared/models/admin/office.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { OfficeService } from '../../../../shared/services/admin/office.service';
import { environment } from '../../../../../environments/environment';
import { CountryService } from '../../../../shared/services/admin/country.service';
import { Country } from '../../../../shared/models/admin/country.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css'],
  providers: [MessageService]
})
export class OfficeListComponent implements OnInit, OnDestroy {

  selectedOffice: Office;
  officeAllSubscription: Subscription;
  officeOneSubscription: Subscription;
  countryAllSubscription: Subscription;

  offices: Office[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private officeSrv: OfficeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Offices', url: 'office'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getOffices();
  }

  getOffices() {
    this.officeSrv.apiUrl = environment.office.root;
    this.officeAllSubscription = this.officeSrv.getAll().subscribe((items: Array<Office>) => {
        this.offices = items;
    });
  }

  getOfficeByID(officeID: number) {
    this.officeSrv.apiUrl = environment.office.root;
    this.officeOneSubscription = this.officeSrv.getSingle(officeID.toString()).subscribe((item: Office) => {
        this.selectedOffice = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getOffices();
  }

  showEditDialog(officeID) {
    this.getOfficeByID(officeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getOffices();
  }

  showDeleteDialog(officeID) {
    this.getOfficeByID(officeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getOffices();
  }

  ngOnDestroy(): void {
    if (this.officeAllSubscription) { this.officeAllSubscription.unsubscribe(); }
    if (this.officeOneSubscription) { this.officeOneSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
  }

}
