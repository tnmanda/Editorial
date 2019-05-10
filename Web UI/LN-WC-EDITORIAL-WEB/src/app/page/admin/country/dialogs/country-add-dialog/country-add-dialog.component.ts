import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Country } from '../../../../../shared/models/admin/country.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { CountryService } from '../../../../../shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-country-add-dialog',
  templateUrl: './country-add-dialog.component.html',
  styleUrls: ['./country-add-dialog.component.css']
})
export class CountryAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  errorMessage: string;

  country: Country;
  countryAddSubscription: Subscription;

  constructor(private globalHelperSrv: GlobalHelperService,
    private countrySrv: CountryService,
    private messageService: MessageService) { }

ngOnInit() {
this.country = new Country();
}

onSave() {
  this.country.createdBy = this.globalHelperSrv.getCurrentUserID();
  this.country.updatedBy = this.globalHelperSrv.getCurrentUserID();
  this.country.dateCreatedUTC = new Date().toUTCString();
  this.country.lastUpdatedUTC = new Date().toUTCString();
  console.log(this.country);
  this.countrySrv.apiUrl = environment.country.root;
  this.countryAddSubscription = this.countrySrv.post(this.country).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.country.countryName + ' successfully created.' });

  this.country = new Country();
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
  if (this.countryAddSubscription) { this.countryAddSubscription.unsubscribe(); }
}

}
