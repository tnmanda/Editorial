import { Component, OnInit, OnDestroy } from '@angular/core';
import { Country } from '../../../../shared/models/admin/country.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { CountryService } from '../../../../shared/services/admin/country.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [MessageService]
})
export class CountryListComponent implements OnInit, OnDestroy {

  selectedCountry: Country;
  countryAllSubscription: Subscription;
  countryOneSubscription: Subscription;

  countries: Country[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private countrySrv: CountryService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Country', url: 'country'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getCountries();
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
        this.countries = items;
    });
  }

  getCountryByID(countryID: number) {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getSingle(countryID.toString()).subscribe((item: Country) => {
        this.selectedCountry = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getCountries();
  }

  showEditDialog(countryID) {
    this.getCountryByID(countryID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getCountries();
  }

  showDeleteDialog(countryID) {
    this.getCountryByID(countryID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getCountries();
  }

  ngOnDestroy(): void {
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
    if (this.countryOneSubscription) { this.countryOneSubscription.unsubscribe(); }
  }

}
