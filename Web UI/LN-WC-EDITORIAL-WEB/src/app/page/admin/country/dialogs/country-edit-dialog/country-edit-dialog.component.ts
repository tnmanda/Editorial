import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Country } from '../../../../../shared/models/admin/country.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';
import { CountryService } from '../../../../../shared/services/admin/country.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-country-edit-dialog',
  templateUrl: './country-edit-dialog.component.html',
  styleUrls: ['./country-edit-dialog.component.css']
})
export class CountryEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedCountry: Country;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  errorMessage: string;

  countryEditSubscription: Subscription;

  constructor(private globalHelperSrv: GlobalHelperService,
              private countrySrv: CountryService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.selectedCountry.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.selectedCountry.lastUpdatedUTC = new Date().toUTCString();

    this.countrySrv.apiUrl = environment.country.root;
    this.countryEditSubscription = this.countrySrv.put(this.selectedCountry).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedCountry.countryName + ' successfully updated.' });

      this.selectedCountry = new Country();
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
    if (this.countryEditSubscription) { this.countryEditSubscription.unsubscribe(); }
  }

}
