import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserCountry } from 'src/app/shared/models/admin/app_user/app-user-country.model';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/shared/models/admin/country.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserCountryService } from 'src/app/shared/services/admin/app_user/app-user-country.service';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-user-country-add-dialog',
  templateUrl: './app-user-country-add-dialog.component.html',
  styleUrls: ['./app-user-country-add-dialog.component.css']
})
export class AppUserCountryAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserCountry: AppUserCountry;

  appUserCountryAddSubscription: Subscription;
  countryAllSubscription: Subscription;

  countries: Country[];

  isSubmitted = false;

  appUserCountryForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserCountryForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserCountrySrv: AppUserCountryService,
              private countrySrv: CountryService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserCountry = new AppUserCountry();
  this.getCountries();
  }

  ngOnChanges() {
    this.appUserCountryForm = new FormGroup ({
      'country' : new FormControl('', Validators.required),
      'isLocked' : new FormControl(false, Validators.required)
      });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
        this.countries = (items || []).sort((a: Country, b: Country) => a.countryName < b.countryName ? -1 : 1);
    });
  }

  onSave(appUserCountryForm) {
    this.isSubmitted = true;
    if (appUserCountryForm.valid) {
      this.appUserCountry = appUserCountryForm.value;
      this.appUserCountry.appUserID = this.selectedAppUser.appUserID;
      this.appUserCountry.countryID = this.appUserCountry.country.countryID;
      this.appUserCountry.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserCountry.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserCountry.dateCreatedUTC = new Date().toUTCString();
      this.appUserCountry.lastUpdatedUTC = new Date().toUTCString();
      this.appUserCountry.country = null;

      this.appUserCountrySrv.apiUrl = environment.app_user.country.root;
      this.appUserCountryAddSubscription = this.appUserCountrySrv.post(this.appUserCountry).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User country successfully created.' });

      this.appUserCountry = new AppUserCountry();
      }, error => { this.errorMessage = error; });
    }

  }

  onClose() {
    this.isSubmitted = false;
    this.appUserCountryForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserCountryAddSubscription) { this.appUserCountryAddSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
  }

}
