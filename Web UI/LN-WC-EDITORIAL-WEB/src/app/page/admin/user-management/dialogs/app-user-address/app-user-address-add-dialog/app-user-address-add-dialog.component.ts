import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from '../../../../../../shared/models/admin/app-user.model';
import { AppUserAddress } from '../../../../../../shared/models/admin/app_user/app-user-address.model';
import { Subscription } from 'rxjs';
import { AddressType } from '../../../../../../shared/models/admin/types/address-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserAddressService } from '../../../../../../shared/services/admin/app_user/app-user-address.service';
import { AddressTypeService } from '../../../../../../shared/services/admin/types/address-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';
import { CountryService } from '../../../../../../shared/services/admin/country.service';
import { Country } from '../../../../../../shared/models/admin/country.model';

@Component({
  selector: 'app-app-user-address-add-dialog',
  templateUrl: './app-user-address-add-dialog.component.html',
  styleUrls: ['./app-user-address-add-dialog.component.css']
})
export class AppUserAddressAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserAddress: AppUserAddress;

  appUserAddressAddSubscription: Subscription;
  addressTypeAllSubscription: Subscription;
  countryAllSubscription: Subscription;

  addressTypes: AddressType[];
  countries: Country[];

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserAddressSrv: AppUserAddressService,
              private addressTypeSrv: AddressTypeService,
              private countrySrv: CountryService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserAddress = new AppUserAddress();
  this.getAddressTypes();
  this.getCountries();
  }

  getAddressTypes() {
    this.addressTypeSrv.apiUrl = environment.addressType.root;
    this.addressTypeAllSubscription = this.addressTypeSrv.getAll().subscribe((items: Array<AddressType>) => {
        this.addressTypes = items;
    });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
      this.countries = items;
    });
  }

  onSave() {
    this.appUserAddress.appUserID = this.selectedAppUser.appUserID;
    this.appUserAddress.addressTypeID = this.appUserAddress.addressType.addressTypeID;
    this.appUserAddress.countryID = this.appUserAddress.country.countryID;
    this.appUserAddress.createdBy = this.globalHelperSrv.getCurrentUser();
    this.appUserAddress.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.appUserAddress.dateCreatedUTC = new Date().toUTCString();
    this.appUserAddress.lastUpdatedUTC = new Date().toUTCString();
    this.appUserAddress.addressType = null;
    this.appUserAddress.country = null;

    this.appUserAddressSrv.apiUrl = environment.app_user.address.root;
    this.appUserAddressAddSubscription = this.appUserAddressSrv.post(this.appUserAddress).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'User Address successfully created.' });

    this.appUserAddress = new AppUserAddress();
    }, error => { this.errorMessage = error; });
  }

  onClose() {
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserAddressAddSubscription) { this.appUserAddressAddSubscription.unsubscribe(); }
    if (this.addressTypeAllSubscription) { this.addressTypeAllSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
  }

}
