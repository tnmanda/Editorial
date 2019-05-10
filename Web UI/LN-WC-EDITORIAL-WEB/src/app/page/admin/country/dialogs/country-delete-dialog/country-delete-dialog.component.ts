import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Country } from '../../../../../shared/models/admin/country.model';
import { Subscription } from 'rxjs';
import { CountryService } from '../../../../../shared/services/admin/country.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-country-delete-dialog',
  templateUrl: './country-delete-dialog.component.html',
  styleUrls: ['./country-delete-dialog.component.css']
})
export class CountryDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedCountry: Country;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  errorMessage: string;

  countryDeleteSubscription: Subscription;

  constructor(private countrySrv: CountryService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryDeleteSubscription = this.countrySrv.delete(this.selectedCountry.countryID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Item ' + this.selectedCountry.countryName + ' successfully deleted.' });
      this.onClose();
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
    if (this.countryDeleteSubscription) { this.countryDeleteSubscription.unsubscribe(); }
  }

}
